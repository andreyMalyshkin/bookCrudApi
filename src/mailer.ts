import nodemailer from 'nodemailer';
import logger from "./logger";

export const sendEmailConfirmation = (email: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email Confirmation',
    text: 'Please confirm your email by clicking the following link...'
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return console.log(error);
    }
    logger.info('Email sent: ' + info.response);
  });
};