const express = require("express");

let router = express.Router({mergeParams: true});
let Campground = require("../models/campground");
let middleware = require("../middleware");

router.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, camps) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds: camps});     
        }
    });
});

router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.post("/campgrounds", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
      id: req.user._id,
      username: req.user.username
    };
    let newCamp = {name: name, price: price, image: image, description: desc, author: author};
    
    Campground.create(newCamp, (err, camp) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW ROUTE
router.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, camp) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/show", {campground: camp});
        }
    });
});

// EDIT
router.get("/campgrounds/:id/edit", middleware.checkOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err)
        {
            req.flash("error", "Campground could not be found");
            return res.redirect("back");
        }
        res.render("campgrounds/edit", {camp: camp});
    });   
});

// UPDATE
router.put("/campgrounds/:id", middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err, camp) => {
        if (err)
        {
            res.redirect("/campground");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
       if (err)
       {
           res.redirect("/campgrounds");
       }
       else
       {
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;