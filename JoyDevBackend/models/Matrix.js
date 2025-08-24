const mongoose = require("mongoose");

const MatrixScheema = new mongoose.Schema({
    title : {
        type : String,
        trim: true
    },
    data : {
        type : Number,
        required : true
    },
    icon: {
        type: String,
        enum: ["all", "work", "person"], // only these values allowed
        required: true
    }
})


module.exports=mongoose.model("Matrix", MatrixScheema);