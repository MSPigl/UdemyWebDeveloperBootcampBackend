const express = require("express");
let app = express();

app.get("/", (request, response) => {
    response.send("Hello there");
});

app.get("/bye", function(request, response) {
    response.send("General Kenobi");
});

app.get("/dog", function(request, response) {
    response.send("You are a bold one");
});

app.get("/r/:subreddit", function(request, response) {
    let subreddit = request.params.subreddit;
    response.send("Welcome to r/" + subreddit.toUpperCase());
});

app.get("*", function(request, response) {
    response.send("You are a sexy boi");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Sever start");
});