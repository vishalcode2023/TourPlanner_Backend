const nodemailer = require("nodemailer");
const welcomeTemplate = require("../Templates/RegisterTemplate");
const LoginTemplate = require("../Templates/LoginTemplate");

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: 587,
  auth: {
    user: process.env.SMPT_LOGIN,
    pass: process.env.SMPT_PASS,
  },
});

async function sendWelcomeEmail(toEmail, userName) {
  const htmlContent = welcomeTemplate(userName);

  const mailOptions = {
    from: '"YourApp Team" <vishalcode2023@gmail.com>',
    to: toEmail,
    subject: "Welcome to YourApp! 🎉",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

async function LoginBackEmail(toEmail, userName) {
  const htmlContent = LoginTemplate(userName);

  const mailOptions = {
    from: '"YourApp Team" <yourapp@example.com>',
    to: toEmail,
    subject: "Welcome to YourApp! 🎉",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

module.exports = { sendWelcomeEmail, LoginBackEmail };
