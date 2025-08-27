const Resume = require("../models/Resume");

const uploadCV = async (resumeData)=>{
    await Resume.deleteMany({});
    await Resume.create(resumeData);
}

const downloadCV = async ()=>{
    const resume = await Resume.findOne().sort({ uploadedAt: -1 }); // latest CV
    if (!resume) return "CV not found";
    return resume;
}

module.exports = {
    uploadCV,
    downloadCV,
}