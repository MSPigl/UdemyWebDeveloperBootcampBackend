const Campground = require("../models/campground");
const Comment = require("../models/comment");

let middlewareObject = {};

middlewareObject.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated())
    {
        Comment.findById(req.params.commentId, (err, comment) => {
            if (err)
            {
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else
            {  
                if (comment.author.id.equals(req.user._id))
                {
                    next();  
                }
                else
                {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });   
    }
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");    
    }  
};

middlewareObject.checkOwnership = function(req, res, next) {
    if (req.isAuthenticated())
    {
        Campground.findById(req.params.id, (err, camp) => {
            if (err)
            {
                req.flash("error", "Campground could not be found");
                res.redirect("back");
            }
            else
            {  
                if (camp.author.id.equals(req.user._id))
                {
                    next();  
                }
                else
                {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });   
    }
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");    
    }
};

middlewareObject.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
    {
        return next();
    }
    
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObject;