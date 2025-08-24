const matrix = require("../database/matrixDB");

const createMatrix = async (matrixData)=>{
    return await matrix.createMatrix(matrixData);
}

const getAllMatrixs = async ()=>{
    return await matrix.getAllMatrixs();
}

const getMatrixById = async (matrixId)=>{
    return await matrix.getMatrixById(matrixId);
}

const deleteMatrix = async (matrixId)=>{
    return await matrix.deleteMatrix(matrixId);
}

const updateMatrix = async (matrixId, updatedData)=>{
    return await matrix.updateMatrix(matrixId, updatedData);     
}

module.exports = {
    createMatrix,
    getAllMatrixs,
    getMatrixById,
    deleteMatrix,
    updateMatrix
}