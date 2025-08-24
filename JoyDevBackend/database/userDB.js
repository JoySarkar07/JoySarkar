const User = require("../models/User");

const createUser = async (userData)=>{
    return await User.create(userData);
}

const getAllUsers = async ()=>{
    return await User.find(); 
}

const getUserByEmail = async (email)=>{
    return await User.findOne({email});
}

const deleteUser = async (UserId)=>{
    return await User.findByIdAndDelete(UserId);
}

const updateUser = async (userId, updatedData)=>{
    return await User.findByIdAndUpdate(
        userId,
        { $set: updatedData},
        { new: true, runValidators: true}
    );
    
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser
}