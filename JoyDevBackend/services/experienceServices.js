const experience = require("../database/experienceDB");

const createExperience = async (experienceData)=>{
    return await experience.createExperience(experienceData);
}

const getAllExperiences = async ()=>{
    return await experience.getAllExperiences();
}

const getExperienceById = async (experienceId)=>{
    return await experience.getExperienceById(experienceId);
}

const deleteExperience = async (experienceId)=>{
    return await experience.deleteExperience(experienceId);
}

const updateExperience = async (experienceId, updatedData)=>{
    return await experience.updateExperience(experienceId, updatedData);     
}

module.exports = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    deleteExperience,
    updateExperience
}