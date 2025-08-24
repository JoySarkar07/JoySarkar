const Skill = require("../models/Skill");

const createSkill = async (skillData)=>{
    return await Skill.create(skillData);
}

const getAllSkills = async ()=>{
    return await Skill.find(); 
}

const getSkillById = async (skillId)=>{
    return await Skill.findById(skillId);
}

const deleteSkill = async (skillId)=>{
    return await Skill.findByIdAndDelete(skillId);
}

const updateSkill = async (skillId, updatedData)=>{
    return await Skill.findByIdAndUpdate(
        skillId,
        { $set: updatedData},
        { new: true, runValidators: true}
    );
    
}

module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill
}