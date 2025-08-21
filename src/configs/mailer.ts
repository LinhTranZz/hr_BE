import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import env from './env'
dotenv.config();

const transporter = nodemailer.createTransport({
    host: env.get("EMAIL_HOST"),
    port: Number(env.get("EMAIL_PORT")),
    secure: false, // true for 465, false for other ports
    auth: {
        user: env.get("EMAIL_USER"), // Your Gmail address
        pass: env.get("EMAIL_PASS"), // Your App Password
    },
});

export default transporter;