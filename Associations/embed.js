const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// POST - title, content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Post = new mongoose.model("Post", postSchema);

// USER - email, name
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

let User = new mongoose.model("User", userSchema);

// let newUser = new User({
//     email: "sample2@gmail.com",
//     name: "Sample Guy2"
// });

// newUser.posts.push({title: "Guy 2's Post", content: "Guy2 content"});

// newUser.save((err, user) => {
//     if (err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(user);
//     }
// });

// let newPost = new Post({
//     title: "New Post",
//     content: "Post content"
// });

// newPost.save((err, post) => {
//     if (err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(post);
//     }
// });

User.findOne({name: "Sample Guy2"}, (err, user) => {
    if (err)
    {
        console.log(err);
    }
    else
    {
        user.posts.push({
            title: "Another post for guy 2",
            content: "Some more content"
        });
        
        user.save((err, user) => {
            if (err)
            {
                console.log(err);
            }
            else
            {
                console.log(user);    
            }
        });
    }
});