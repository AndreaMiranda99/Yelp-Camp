var express = require("express"); 
var router = express.Router(); 
var Campground = require("../models/campgrounds"); 
var Comment = require("../models/comments"); 
var passport = require("passport"); 

router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            res.send("err!"); 
        }else{
            res.render("comments/new", {campground: campground}); 
        }
    });
    
}); 
router.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
    var comment = req.params.comment; 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err)
                {
                    console.log(err);
                } else {
                    //add username and id to the comment 
                    comment.username.authUsername = req.user.username; 
                    comment.username.id = req.user._id; 
                    comment.save(); 
                    campground.comments.push(comment); 
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id); 
                } 
            });            
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", function(req,res){
   // res.send("EDIT ROUTE FOR A COMMENT"); 
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("../views/comments/edit", {comment:foundComment});
        }
    });     
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next(); 
    }
    res.redirect("/login"); 
}

module.exports = router; 