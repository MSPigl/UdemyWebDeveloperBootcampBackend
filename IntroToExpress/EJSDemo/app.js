const express = require("express");
let app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("home");    
});

app.get("/fallinlovewith/:thing", (request, response) => {
    let thing = request.params.thing;
    
    response.render("love", {
        "thingVar": thing
    });    
});

app.get("/posts", (request, response) => {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My pet is Skye", author: "James"},
        {title: "I'm a philanthropist", author: "Charlie"}
    ];
    
    response.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server start");
});