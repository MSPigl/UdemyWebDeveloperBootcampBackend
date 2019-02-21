const express = require("express");

let router = express.Router({mergeParams: true});
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middleware = require("../middleware");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new", {campground: camp});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            Comment.create(req.body.comment, (err, comment) => {
                if (err)
                {
                    req.flash("error", "Something went wrong");
                    res.redirect("/campgrounds")
                }
                else
                {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    // save comment
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success", "Comment created");
                    res.redirect("/campgrounds/" + req.params.id);     
                }
            });
        }
    });
});

// EDIT
router.get("/campgrounds/:id/comments/:commentId/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.commentId, (err, comment) => {
       if (err)
       {
           res.redirect("back");
       }
       else
       {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});    
       }
    });
});

// UPDATE
router.put("/campgrounds/:id/comments/:commentId", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, comment) => {
        if (err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DESTROY
router.delete("/campgrounds/:id/comments/:commentId", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if (err)
        {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }
        else
        {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;