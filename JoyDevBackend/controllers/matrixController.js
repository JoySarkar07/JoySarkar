const matrixService = require("../services/matrixService");

const createMatrix = async (req, res)=>{
    try{
        const response = await matrixService.createMatrix(req.body);
        res.status(201).send({message:"Matrix created successfully.", data:response});
    }catch(e){
        res.status(500).send({message:"Matrix creation failled.", data:e.message});
    }
}

const getAllMatrixs = async (req, res)=>{
    try{
        const response = await matrixService.getAllMatrixs();
        res.status(200).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const getMatrixById = async (req, res)=>{
    try{
        const response = await matrixService.getMatrixById(req.params.matrixId);
        res.status(201).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const deleteMatrix = async (req, res)=>{
    try{
        await matrixService.deleteMatrix(req.params.matrixId);
        res.status(204).send({message:"No Content"});
    }catch(e){
        res.status(400).send({message:"Bad Request"});
    }
}

const updateMatrix = async (req, res)=>{
    try{
        const response = await matrixService.updateMatrix(req.params.matrixId, req.body);
        res.status(200).send({message:"Matrix updated successfully.", data:response});
    }catch(e){
        res.status(400).send({message:"Matrix updation failled.", data:e.message});
    }
}

module.exports = {
    createMatrix,
    getAllMatrixs,
    getMatrixById,
    deleteMatrix,
    updateMatrix
}