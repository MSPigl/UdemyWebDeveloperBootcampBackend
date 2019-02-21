const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });

const Post = require("./models/post.js");
const User = require("./models/user.js");

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Beltcher"
// });

Post.create({
    title: "How to cook the best burger pt.4",
    content: "asd5a4s6d54as4d64a6s4d64a"
}, (err, post) => {
    if (err)
    {
        console.log(err);
    }
    else
    {
        User.findOne({email: "bob@gmail.com"}, (err, user) => {
            if (err)
            {
                console.log(err);
            }
            else
            {
                user.posts.push(post);
                user.save((err, data) => {
                    if (err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log(data);
                    }
                });
            }
        });
    }
});

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log(user);
    }
});