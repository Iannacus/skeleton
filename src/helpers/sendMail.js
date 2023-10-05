const transporter = require("./mailer");
const ejs = require("ejs");
const path = require("path");
const { signCofirmToken } = require("./signToken");
const getImages = require("./getImages");
require("dotenv").config();

const sendMail = (email, subject, template, attachments) => {
  transporter.sendMail({
    to: email,
    subject, // subject: subject
    html: template,
    attachments,
  });
};

const getTemplate = async (templatePath, templateVar) => {
  const emailTemplate = path.join(__dirname, templatePath);
  const template = await ejs.renderFile(emailTemplate, templateVar);
  return template;
};

const sendWelcomeEmail = async (email, data) => {
  const token = signCofirmToken({ email });
  const template = await getTemplate("../views/welcome/welcome-email.ejs", {
    ...data,
    token,
    url: process.env.FRONT_URL,
  });

  const attachments = await getImages("/views/welcome/images");

  sendMail(email, "Bienvenido a academlo chat", template, attachments);
};

module.exports = sendWelcomeEmail;
