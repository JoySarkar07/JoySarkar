const mongoose = require("mongoose");

const SkillScheema = new mongoose.Schema({
    skill : {
        type : String,
        trim: true
    },
})

module.exports=mongoose.model("Skill", SkillScheema);