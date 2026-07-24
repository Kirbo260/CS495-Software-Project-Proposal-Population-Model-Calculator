// Email Service To send Tokens to users for email verification and password reset
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/*export async function sendEmail(from, to, text) {
    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., Gmail, Outlook, etc.
        auth: {}

    });

}*/
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("EMAIL_USER:", process.env.EMAIL_AUTH_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_AUTH_PASS ? "Loaded" : "Missing");

async function emailSent() {

console.log("EMAIL_USER:", process.env.EMAIL_AUTH_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_AUTH_PASS ? "Loaded" : "Missing");

const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // use STARTTLS (upgrade connection to TLS after connecting)\
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
    },
    
});

try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}           

try {
  const info = await transporter.sendMail({
    from: '"Example Team" <oseje2003@gmail.com>', // sender address
    to: "osejeehidouglas@gmail.com", // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?, How do you do?", // plain text body
  });

  console.log("Message: %s", info);
  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

emailSent().catch(console.error);