const Experience = require("../models/Experience");

const createExperience = async (experienceData)=>{
    return await Experience.create(experienceData);
}

const getAllExperiences = async ()=>{
    return await Experience.find(); 
}

const getExperienceById = async (experienceId)=>{
    return await Experience.findById(experienceId);
}

const deleteExperience = async (experienceId)=>{
    return await Experience.findByIdAndDelete(experienceId);
}

const updateExperience = async (experienceId, updatedData)=>{
    return await Experience.findByIdAndUpdate(
        experienceId,
        { $set: updatedData},
        { new: true, runValidators: true}
    );
    
}

module.exports = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    deleteExperience,
    updateExperience
}