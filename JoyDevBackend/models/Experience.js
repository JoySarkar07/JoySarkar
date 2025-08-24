const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type : String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
}, { timestamps: true, strict: true });


module.exports=mongoose.model("Experience", ExperienceSchema);