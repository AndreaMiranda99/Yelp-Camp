var express = require("express"); 
var router = express.Router(); 
var Campground = require("../models/campgrounds"); 
var Comment = require("../models/comments"); 
var bodyParser = require("body-parser"); 
router.use(bodyParser.urlencoded({extended:true})); 

router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err,camp){
        if(err){
            console.log("Error! Could not find campgrounds"); 
        }
        else{
            res.render("campgrounds/campgrounds", {campgrounds:camp, currentUser: req.user}); 
        }
    }); 
    // res.render("campgrounds", {campgrounds: campgrounds}); 
});
router.get("/campgrounds/new",isLoggedIn,  function(req,res){
    res.render("campgrounds/new.ejs"); 
}); 

router.post("/campgrounds",isLoggedIn, function(req, res){
    //get data from the form and use it 
    var campName = req.body.newCampground;
    var campImg = req.body.newCampImage; 
    var newCamp = {name: campName, image: campImg, author:{username: req.user.username, id: req.user._id}}; 
    // campgrounds.push(newCamp);
    //Creating a campground and pushing it to the database 
    Campground.create(newCamp, function(err,campground){
        if(err){
            console.log("Error in adding a campground!"); 
        }
        else{
            console.log("Successfully Added" + campground); 
        }
    }); 
    //go back to campgrounds page
    res.redirect("/campgrounds"); 
});

//SHOW = shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    //find the compound with provided ID
    Campground.findById( req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err); 
        }
        else{
            //render the show template with that campground 
            res.render("campgrounds/show", {campground: foundCampground ,currentUser: req.user}); 
        }
    }); 
});

//Editing the campgrounds 
router.get("/campgrounds/:id/edit",checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
    res.render("../views/campgrounds/edit", {campground: foundCampground ,currentUser: req.user});
    });      
});

router.put("/campgrounds/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id,req.body.newCampground, function(err,campground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+ req.params.id); 
        }
    });
});

//DESTROY ROUTES
router.delete("/campgrounds/:id", function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds"); 
        }
    });
}); 

function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                res.redirect("back");
            }else{
               if(foundCampground.author.id.equals(req.user._id)){
                next(); 
               }else{
                   res.redirect("back"); 
               }                
            }
        });
    }else{
        res.redirect("back"); 
    }
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next(); 
    }
    res.redirect("/login"); 
}
module.exports = router; 

// if(req.isAuthenticated()){
    //     Campground.findById(req.params.id, function(err,foundCampground){
    //         if(err){
    //             console.log(err);
    //         }else{
    //            if(foundCampground.author.id.equals(req.user._id)){
    //             res.render("../views/campgrounds/edit", {campground: foundCampground});
    //            }else{
    //                res.send("Only the author can edit this"); 
    //            }                
    //         }
    //     });
    // }else{
    //     res.send("You cannot perform this action"); 
    // }  