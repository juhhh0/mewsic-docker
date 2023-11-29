import nodemailer from "nodemailer";

const mailTransport = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_AUTH_USER,
      pass: process.env.GMAIL_AUTH_PASS,
    },
  });

export default mailTransport;
