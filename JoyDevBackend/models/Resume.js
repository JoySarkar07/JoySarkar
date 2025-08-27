const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true }, // e.g. application/pdf
  data: { type: Buffer, required: true },        // store file as binary
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", cvSchema);
