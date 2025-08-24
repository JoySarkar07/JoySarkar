const Matrix = require("../models/Matrix");

const createMatrix = async (matrixData)=>{
    return await Matrix.create(matrixData);
}

const getAllMatrixs = async ()=>{
    return await Matrix.find(); 
}

const getMatrixById = async (matrixId)=>{
    return await Matrix.findById(matrixId);
}

const deleteMatrix = async (matrixId)=>{
    return await Matrix.findByIdAndDelete(matrixId);
}

const updateMatrix = async (matrixId, updatedData)=>{
    return await Matrix.findByIdAndUpdate(
        matrixId,
        { $set: updatedData},
        { new: true, runValidators: true}
    );
    
}

module.exports = {
    createMatrix,
    getAllMatrixs,
    getMatrixById,
    deleteMatrix,
    updateMatrix
}