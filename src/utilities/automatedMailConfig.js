const nodemailer = require('nodemailer');
require('dotenv/config')

const nodemailerConfig = () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    
    return transporter;
  };

module.exports = nodemailerConfig