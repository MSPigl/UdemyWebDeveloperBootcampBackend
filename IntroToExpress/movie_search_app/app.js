const express = require("express");
const request = require("request");

let app = express();
app.set("view engine", "ejs");

app.get("/", (req, resp) => {
    resp.render("search");
});

app.get("/results", (req, resp) => {
   let query = req.query.search;
   let url = `http://www.omdbapi.com/?apikey=thewdb&s=${query}`;
   request(url, (error, response, body) => {
       if (!error && response.statusCode == 200)
       {
           let data = JSON.parse(body);
           resp.render("results", {data: data});
       }
   });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server start");
});