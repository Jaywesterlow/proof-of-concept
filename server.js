import express from "express";
import fetchJson from "./helpers/fetch-json.js";

const app = express();

const apiUrl = "https://api.mobile.bnr.nl/v1/articles";
const audioUrl = "http://25683.live.streamtheworld.com/BNR_BUSINESS_BEATS.mp3";

// Voeg een servervariabele toe om het aantal keer klikken bij te houden
let shareCounter = 0;


app.set("view engine", "ejs");

app.set("views", "./views");

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

// ---- GET Routes ----

// Get index, geef eerste 12 artikelen, audio URL en elk artikels desbetreffende link
app.get("/", (request, response) => {
  fetchJson(apiUrl).then((articles) => {
    const maxArticles = articles.slice(0, 12);
    const shareLink = articles.map((artikel) => artikel.shareURL);
    response.render("index", {maxArticles, shareLink, shareCounter, audioUrl});
  });
});

// ---- POST Routes ----

// Implementeer de POST-route voor het bijwerken van de teller
app.post("/update-share-counter", (request, response) => {
  // Verhoog de teller bij elk verzoek
  shareCounter++;
  // Stuur de bijgewerkte tellerwaarde terug naar de client (bijvoorbeeld in JSON-formaat)
  response.json({ shareCount: shareCounter });
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
