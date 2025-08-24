const project = require("../database/projectDB");

const createProject = async (projectData)=>{
    return await project.createProject(projectData);
}

const getAllProjects = async ()=>{
    return await project.getAllProjects();
}

const getProjectById = async (projectId)=>{
    return await project.getProjectById(projectId);
}

const deleteProject = async (projectId)=>{
    return await project.deleteProject(projectId);
}

const updateProject = async (projectId, updatedData)=>{
    return await project.updateProject(projectId, updatedData);     
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject
}