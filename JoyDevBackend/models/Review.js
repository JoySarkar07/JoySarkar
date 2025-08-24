const mongoose = require("mongoose");

const ReviewScheema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        trim: true
    },
    review : {
        type : String,
        required : true,
        trim : true
    },
    rating : {
        type : Number,
        required : true,
        min: 1,
        max: 5  
    },
},{timestamps:true, strict:true})

module.exports=mongoose.model("Review", ReviewScheema);