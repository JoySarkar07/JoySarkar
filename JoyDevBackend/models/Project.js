const mongoose = require("mongoose");

const ProjectScheema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        trim: true
    },
    description : {
        type : [String],
        required : true,
    },
    imageUrl : {
        type : String,
        required : true
    },
    techStack : {
        type : [String],
        required : true
    },
    githubLink : {
        type : String,
        require : true
    },
    liveLink : {
        type : String,
        default : null
    },
    isClientProject : {
        type : Boolean,
        default : false
    }
},{timestamps:true, strict:true})

module.exports=mongoose.model("Project", ProjectScheema);