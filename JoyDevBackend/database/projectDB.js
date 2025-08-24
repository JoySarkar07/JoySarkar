const Project = require("../models/Project");

const createProject = async (projectData)=>{
    return await Project.create(projectData);
}

const getAllProjects = async ()=>{
    return await Project.find(); 
}

const getProjectById = async (projectId)=>{
    return await Project.findById(projectId);
}

const deleteProject = async (projectId)=>{
    return await Project.findByIdAndDelete(projectId);
}

const updateProject = async (projectId, updatedData)=>{
    return await Project.findByIdAndUpdate(
        projectId,
        { $set: updatedData},
        { new: true, runValidators: true}
    );
    
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject
}