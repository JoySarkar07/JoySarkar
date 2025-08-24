const projectService = require("../services/projectServices");

const createProject = async (req, res)=>{
    try{
        const response = await projectService.createProject(req.body);
        res.status(201).send({message:"Project created successfully.", data:response});
    }catch(e){
        res.status(500).send({message:"Project creation failled.", data:e.message});
    }
}

const getAllProjects = async (req, res)=>{
    try{
        const response = await projectService.getAllProjects();
        res.status(200).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const getProjectById = async (req, res)=>{
    try{
        const response = await projectService.getProjectById(req.params.projectId);
        res.status(201).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const deleteProject = async (req, res)=>{
    try{
        await projectService.deleteProject(req.params.projectId);
        res.status(204).send({message:"No Content"});
    }catch(e){
        res.status(400).send({message:"Bad Request"});
    }
}

const updateProject = async (req, res)=>{
    try{
        const response = await projectService.updateProject(req.params.projectId, req.body);
        res.status(200).send({message:"Project updated successfully.", data:response});
    }catch(e){
        res.status(400).send({message:"Project updation failled.", data:e.message});
    }
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject
}