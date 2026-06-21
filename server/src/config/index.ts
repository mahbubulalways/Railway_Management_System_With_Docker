import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const Config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  REDIS_URL: process.env.REDIS_URL,
  MAIL_SENDER_ADDRESS: process.env.MAIL_SENDER_ADDRESS,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
