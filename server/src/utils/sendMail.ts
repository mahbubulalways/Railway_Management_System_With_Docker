import nodemailer from "nodemailer";
import { Config } from "../config";
type TPayload = {
  receiver: string;
  subject?: string;
  html: string;
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: Config.MAIL_SENDER_ADDRESS,
    pass: Config.MAIL_PASSWORD,
  },
});

export const sendMail = async ({ receiver, subject, html }: TPayload) => {
  const info = await transporter.sendMail({
    from: Config.MAIL_SENDER_ADDRESS,
    to: receiver,
    subject: subject,
    html: html,
  });

  return info;
};
