var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var User = require("../models/user"); 
var bodyParser = require("body-parser"); 
router.use(bodyParser.urlencoded({extended:true})); 

router.get("/", function(req, res){
    res.render("landing"); 
}); 

//=====================
//  AUTH ROUTES
//=====================

router.get("/register", function(req, res){
    res.render("register"); 
}); 
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err); 
            return res.render("../views/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("../views/campgrounds/campgrounds");
        });
    }); 
}); 

//==================
//  LOGIN ROUTES
//==================

router.get("/login", function(req, res){
    res.render("login"); 
}); 
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req,res){

}); 

//==================
//  LOGOUT ROUTES
//==================

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("campgrounds"); 
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next(); 
    }
    res.redirect("/login"); 
}

module.exports = router; 