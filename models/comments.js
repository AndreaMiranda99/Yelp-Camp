const mongoose  = require("mongoose");

var commentSchema = new mongoose.Schema({
    username:{
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
        authUsername: String
    }, 
    comment: String
}); 


module.exports = mongoose.model("Comment", commentSchema); 