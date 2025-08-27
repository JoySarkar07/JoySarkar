const resumeServices = require("../services/resumeServices");

const uploadCV = async (req, res) => {
  try {
    const resumeData = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    }
    await resumeServices.uploadResume(resumeData);

    res.status(200).json({ message: "CV uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading CV" });
  }
}

const downloadCV = async (req, res) => {
  try{
    const cv = await resumeServices.downloadResume();
    res.set({
      "Content-Type": cv.contentType,
      "Content-Disposition": `attachment; filename="JoySarkar.pdf"`,
    });
  
    res.send(cv.data);
  }catch(e){
    res.send("some error occure : "+e.message);
  }
}

module.exports = {
    uploadCV,
    downloadCV
}