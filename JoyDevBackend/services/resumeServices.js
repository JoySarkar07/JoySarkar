const resume = require("../database/resumeDB");

const uploadResume = async (resumeData)=>{
    return await resume.uploadCV(resumeData);
}

const downloadResume = async ()=>{
    return resume.downloadCV();
}

module.exports = {
    uploadResume,
    downloadResume,
}