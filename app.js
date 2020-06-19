var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"), 
    seedDB = require("./seeds.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"), 
    Campground = require("./models/campgrounds.js"), 
    Comment = require("./models/comments.js"),
    User = require("./models/user"); 

app.use(methodOverride("_method")); 

app.use(function(req,res,next){
    res.locals.currentUser = req.user; 
    next(); 
});
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/camps");  

app.use(bodyParser.urlencoded({extended:true})); 

app.use(express.static(__dirname + "/public"));  

//==========================
//      PASSPORT CONFIG
//=========================
app.use(require("express-session")({
    secret: "Once again rusty wins cutest dog", 
    resave : false, 
    saveUninitialized : false
})); 

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//  seedDB(); 

//==============================
//      ADDING THE ROUTES
//==============================

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"); 

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes); 



app.listen(500, function(){
    console.log("YelpCamp Server has started"); 
}); 