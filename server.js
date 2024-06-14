import express from "express";
import fetchJson from "./helpers/fetch-json.js";

const app = express();

const apiUrl = "https://api.mobile.bnr.nl/v1/articles";
const audioUrl = "http://25683.live.streamtheworld.com/BNR_BUSINESS_BEATS.mp3";

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("./public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// ---- GET Routes ----

// Get index, geef eerste 12 artikelen mee, geef audio URL mee
app.get("/", (request, response) => {
  fetchJson(apiUrl).then((articles) => {
    const maxArticles = articles.slice(0, 12);
    response.render("index", {maxArticles,audioUrl});
  });
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
