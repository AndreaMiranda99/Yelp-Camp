var mongoose = require("mongoose");
var Campground = require("./models/campgrounds"); 
const campgrounds = require("./models/campgrounds");
var Comment = require("./models/comments"); 
var data =[
    {name:"Clouds Rest",
     image:"https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "In ac sem nec orci rutrum scelerisque pharetra et metus. Vestibulum elementum, ipsum nec hendrerit iaculis, sem enim dignissim diam, sit amet mattis velit ligula in felis. In porta risus massa, sed aliquet libero pretium non. Ut leo turpis, rhoncus vel molestie eget, ornare non sapien. Nunc cursus augue a fringilla euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."}, 
    {
        name:"Granite Hill", 
        image: "https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ipsum accumsan, cursus tortor et, accumsan massa. Praesent fringilla tortor lacinia, vulputate metus vitae, egestas arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        }, 
    {
        name:"Sandy Shallows", 
        image: "https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        description: "Vestibulum nisl ipsum, laoreet ac risus sit amet, imperdiet pretium nibh. Aliquam eget sollicitudin magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id nisl lacus. Suspendisse volutpat et risus interdum malesuada. Quisque interdum felis quis quam luctus cursus. Aenean ultrices, nunc ultrices consequat pulvinar, metus nibh pretium tortor, eu euismod ex enim sit amet ligula."
    },
    {
        name:"Shady Valley", 
        image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Vivamus et leo sed erat laoreet accumsan in et dui. Pellentesque vitae suscipit tortor, at ultrices ante. Vivamus efficitur nisi nec tristique vehicula. Integer consequat hendrerit ex id sodales. Quisque finibus, nisi non posuere consequat, mauris turpis finibus urna, ut mattis mi risus faucibus elit." 
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // else{
        //     console.log("removed campgrounds!"); 
        //     //add a few campgrounds 
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err,data){
        //             if(err){
        //                 console.log(err); 
        //             }
        //             else{
        //                 console.log(data); 
        //                 //adding comments
        //                 Comment.create({
        //                     username: "a234", 
        //                     comment: "This place is beautiful but does not have wifi"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err); 
        //                     }
        //                     else{
        //                         data.comments.push(comment); 
        //                         data.save(); 
        //                         console.log("Created Comments!"); 
        //                     }
                            
        //                 });
        //             }
        //         });
        //     }); 
        // }
    });
    
}

module.exports = seedDB; 
 

