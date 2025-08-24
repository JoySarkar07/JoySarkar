const mongoose = require("mongoose");

const UserScheema = new mongoose.Schema({
    email : {
        type : String,
        trim : true
    },
    password : {
        type : String,
    }
})


module.exports=mongoose.model("User", UserScheema);