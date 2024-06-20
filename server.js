import express from "express";
import fetchJson from "./helpers/fetch-json.js";
import session from "express-session";

const app = express();

const apiUrl = "https://api.mobile.bnr.nl/v1/articles";
const audioUrl = "http://25683.live.streamtheworld.com/BNR_BUSINESS_BEATS.mp3";

const sessionSecret = process.env.SESSION_SECRET || "key";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure:true in productie met HTTPS
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Zorgt ervoor dat JSON-verzoeken correct worden verwerkt

// ---- GET Routes ----

app.get("/", (request, response) => {
  fetchJson(apiUrl).then((articles) => {
    const maxArticles = articles.slice(0, 12);

    // Local shareCounters object per request
    const shareCounters = request.session.shareCounters || {};

    maxArticles.forEach((article) => {
      article.shareCounter = shareCounters[article.id] || 0;
    });

    // Sla shareCounters op in de sessie
    request.session.shareCounters = shareCounters;

    response.render("index", { maxArticles, audioUrl });
  });
});

// ---- POST Routes ----

app.post("/update-share-counter", (request, response) => {
  const { articleId } = request.body;

  // Haal shareCounters op uit de sessie of maak een nieuwe
  const shareCounters = request.session.shareCounters || {};

  // Update shareCounter voor het specifieke artikel
  if (!shareCounters[articleId]) {
    shareCounters[articleId] = 0;
  }

  // Voeg 1 toe op de counter met de juiste artikel ID
  shareCounters[articleId]++;

  // Sla shareCounters op in sessie
  request.session.shareCounters = shareCounters;

  response.json({ shareCount: shareCounters[articleId] });
});

// Post route for e-mail
app.post("/post-signup", function (request, response) {
  const email = request.body.email;
  response.render("signup", { email: email });
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
