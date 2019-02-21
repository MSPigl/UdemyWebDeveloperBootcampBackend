const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

let catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

let Cat = mongoose.model("Cat", catSchema);

// add a new cat to the database
let george = new Cat({
   name: "Mrs. Norris",
   age: 7,
   temperament: "evil"
});

// george.save((err, cat) => {
//     if (err)
//     {
//         console.log("Something went wrong");
//         console.log(err);
//     }
//     else
//     {
//         console.log("Add CAT to database");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Lord Fluffles",
//     age: 15,
//     temperament: "bland"
// }, (err, cat) => {
//     if (err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(`Added ${cat.name} to collection`);
//     }
// });

// retrieve all cats from the database
Cat.find({}, (err, cats) => {
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("All the cats")
        console.log(cats);
    }
});