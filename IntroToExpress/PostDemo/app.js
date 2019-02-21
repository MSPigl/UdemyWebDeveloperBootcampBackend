const express = require("express");
const bodyParser = require("body-parser");
let app = express();

let friends = ["Erich", "Chris", "Mable", "Pierre"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request, response) => {
    response.render("home");
});

app.post("/addFriend", (request, response) => {
    let newFriend = request.body.newFriend;
    friends.push(newFriend);
    response.redirect("/friends");
});

app.get("/friends", (request, response) => {
    response.render("friends", {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server start");
})