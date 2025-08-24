const skillService = require("../services/skillServices");

const createSkill = async (req, res)=>{
    try{
        const response = await skillService.createSkill(req.body);
        res.status(201).send({message:"Skill created successfully.", data:response});
    }catch(e){
        res.status(500).send({message:"Skill creation failled.", data:e.message});
    }
}

const getAllSkills = async (req, res)=>{
    try{
        const response = await skillService.getAllSkills();
        res.status(200).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const getSkillById = async (req, res)=>{
    try{
        const response = await skillService.getSkillById(req.params.skillId);
        res.status(201).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const deleteSkill = async (req, res)=>{
    try{
        await skillService.deleteSkill(req.params.skillId);
        res.status(204).send({message:"No Content"});
    }catch(e){
        res.status(400).send({message:"Bad Request"});
    }
}

const updateSkill = async (req, res)=>{
    try{
        const response = await skillService.updateSkill(req.params.skillId, req.body);
        res.status(200).send({message:"Skill updated successfully.", data:response});
    }catch(e){
        res.status(400).send({message:"Skill updation failled.", data:e.message});
    }
}

module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    deleteSkill,
    updateSkill
}