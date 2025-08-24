const path = require("path");
const fs = require("fs");

const uploadCV = (req, res) => {
  res.json({ message: "CV uploaded successfully!" });
}

const downloadCV = (req, res) => {
  let filePath = path.join(__dirname, "uploads", "mycv.pdf");
  filePath = filePath.replace("\\controllers", "") // adjust if DOCX
  console.log(filePath);
  if (fs.existsSync(filePath)) {
    res.download(filePath, "JoySarkar-CV.pdf"); // this will force download
  } else {
    res.status(404).json({ message: "CV not found" });
  }
}

module.exports = {
    uploadCV,
    downloadCV
}