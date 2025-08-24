const user = require("../database/userDB");
const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
  const saltRounds = 12; 
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

const createUser = async (userData)=>{
    userData.password = await hashPassword(userData.password);
    return await user.createUser(userData);
}

const getAllUsers = async ()=>{
    return await user.getAllUsers();
}

const getUserByEmail = async (email)=>{
    return await user.getUserByEmail(email);
}

const deleteUser = async (userId)=>{
    return await user.deleteUser(userId);
}

const updateUser = async (userId, updatedData)=>{
    if(updatedData.password){
        updatedData.password = hashPassword(updatedData.password);
    }
    return await user.updateUser(userId, updatedData);     
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    deleteUser,
    updateUser
}