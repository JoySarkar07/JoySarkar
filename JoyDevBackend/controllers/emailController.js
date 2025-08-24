const sendEmail = require("../services/emailService");

const sendMail = async (req, res)=>{
    try{
        const { subject, email, message } = req.body;
        const response = await sendEmail(subject, email, message);
        res.status(200).send({success: response});
    }catch(e){
        res.status(500).send({success: false, error: e});
    }
}

module.exports = sendMail;
