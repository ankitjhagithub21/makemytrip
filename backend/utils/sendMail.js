const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port:process.env.SMTP_PORT, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.APP_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });
};

module.exports = sendMail;