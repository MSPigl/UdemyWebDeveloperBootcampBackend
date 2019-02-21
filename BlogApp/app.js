const express = require("express");
const expressSanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// APP CONFIG
let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });

// MONGOOSE/MODEL CONFIG
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES

// INDEX ROUTE(S)
app.get("/", (req, resp) => {
    resp.redirect("/blogs");
});

app.get("/blogs", (req, resp) => {
    Blog.find({}, (err, blogs) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            resp.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", (req, resp) => {
    resp.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, resp) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, blog) => {
        if (err)
        {
            resp.render("new");
        }
        else
        {
            resp.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", (req, resp) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err)
        {
            resp.redirect("/blogs");
        }
        else
        {
            resp.render("show", {blog: blog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, resp) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err)
        {
            resp.redirect("/blogs");
        }
        else
        {
            resp.render("edit", {blog: blog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", (req, resp) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.updateOne({_id: req.params.id}, req.body.blog, (err, blog) => {
        if (err)
        {
            resp.redirect("/blogs");
        }
        else
        {
            resp.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, resp) => {
    Blog.deleteOne({_id: req.params.id}, (err, blog) => {
        if (err)
        {
            resp.redirect("/blogs");
        }
        else
        {
            resp.redirect("blogs/");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("BlogApp server started");
});