const nodemailer = require("nodemailer");

require("dotenv").config();

const {MAILER_PASS} = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "goit-hw6-mailer@meta.ua",
    pass: MAILER_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

module.exports = transport;
