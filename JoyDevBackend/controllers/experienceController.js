const experienceServices = require("../services/experienceServices");

const createExperience = async (req, res)=>{
    try{
        const response = await experienceServices.createExperience(req.body);
        res.status(201).send({message:"Experience created successfully.", data:response});
    }catch(e){
        res.status(500).send({message:"Experience creation failled.", data:e.message});
    }
}

const getAllExperiences = async (req, res)=>{
    try{
        const response = await experienceServices.getAllExperiences();
        res.status(200).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const getExperienceById = async (req, res)=>{
    try{
        const response = await experienceServices.getExperienceById(req.params.experienceId);
        res.status(201).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const deleteExperience = async (req, res)=>{
    try{
        await experienceServices.deleteExperience(req.params.experienceId);
        res.status(204).send({message:"No Content"});
    }catch(e){
        res.status(400).send({message:"Bad Request"});
    }
}

const updateExperience = async (req, res)=>{
    try{
        const response = await experienceServices.updateExperience(req.params.experienceId, req.body);
        res.status(200).send({message:"Experience updated successfully.", data:response});
    }catch(e){
        res.status(400).send({message:"Experience updation failled.", data:e.message});
    }
}

module.exports = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    deleteExperience,
    updateExperience
}