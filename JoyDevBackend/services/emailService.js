const nodemailer = require("nodemailer");

const sendEmail = async (subject, email, message)=>{
    let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.APP_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.GMAIL,
    to: process.env.GMAIL,
    replyTo: email,
    subject: `Portfolio Contact for : ${subject}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    return "success";
  } catch (error) {
    return "error : "+error.message;
  }
}

module.exports = sendEmail;