const userService = require("../services/userService");
const login = require("../services/authServices");

const createUser = async (req, res)=>{
    try{
        const response = await userService.createUser(req.body);
        res.status(201).send({message:"User created successfully.", data:response});
    }catch(e){
        res.status(500).send({message:"User creation failled.", data:e.message});
    }
}

const getAllUsers = async (req, res)=>{
    try{
        const response = await userService.getAllUsers();
        res.status(200).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const getUserByEmail = async (req, res)=>{
    try{
        const response = await userService.getUserByEmail(req.params.email);
        res.status(201).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const deleteUser = async (req, res)=>{
    try{
        await userService.deleteUser(req.params.userId);
        res.status(204).send({message:"No Content"});
    }catch(e){
        res.status(400).send({message:"Bad Request"});
    }
}

const updateUser = async (req, res)=>{
    try{
        const response = await userService.updateUser(req.params.userId, req.body);
        res.status(200).send({message:"User updated successfully.", data:response});
    }catch(e){
        res.status(400).send({message:"User updation failled.", data:e.message});
    }
}

const userLogin = async (req, res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password) res.status(400).send({message: "all fields are required"});
        const response = await login(email, password);
        res.status(200).send(response);
    }catch(e){
        res.status(400).send({error: e.message});
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    deleteUser,
    updateUser,
    userLogin
}