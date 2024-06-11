import express from "express";
import fetchJson from "./helpers/fetch-json.js";

const app = express();

const apiUrl = "https://api.mobile.bnr.nl/v1/articles";

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// ---- GET Routes ----

// // Maak een GET route voor de index
// app.get("/", function (request, response) {
//   // Haal alle personen uit de WHOIS API op
//   fetchJson(apiUrl).then((apiData) => {
//     // apiData bevat gegevens van alle personen uit alle squads
//     // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

//     // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
//     response.render("index", { article: apiData.data });
//   });
// });

app.get('/', (request, response) => {
    response.render('index')
})

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
