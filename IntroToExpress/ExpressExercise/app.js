const express = require("express");
let app = express();

let animals = {
  "pig": "'Oink'",
  "cow": "'Moo'",
  "dog": "'Woof Woof!'",
  "cat": "'Meow'",
  "bat": "'...'"
};

app.get("/", (request, response) => {
    response.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", (request, response) => {
    let animal = request.params.animal;
    response.send(`The ${animal} says ${animals[animal]}`);
});

app.get("/repeat/:phrase/:num", (request, response) => {
    let phrase = request.params.phrase;
    let num = parseInt(request.params.num);
    let str = '';
    
    for (let i = 0; i < num - 1; i++)
    {
        str += phrase + " ";
    }
    str += phrase;
    
    response.send(str);
});

app.get("*", (request, response) => {
   response.send("Sorry, page not found"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Sever start");
});