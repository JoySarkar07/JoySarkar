const skill = require("../database/skillsDB");

const createSkill = async (skillData)=>{
    return await skill.createSkill(skillData);
}

const getAllSkills = async ()=>{
    return await skill.getAllSkills();
}

const getSkillById = async (SkillId)=>{
    return await skill.getSkillById(SkillId);
}

const deleteSkill = async (SkillId)=>{
    return await skill.deleteSkill(SkillId);
}

const updateSkill = async (SkillId, updatedData)=>{
    return await skill.updateSkill(SkillId, updatedData);     
}

module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    deleteSkill,
    updateSkill
}