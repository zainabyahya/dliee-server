// routes/contact.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // create reusable transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // or "hotmail", "outlook", or use SMTP
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.MAIL_RECEIVER,
            subject: "رسالة جديدة من نموذج التواصل",
            text: message,
            html: `<p><strong>الاسم:</strong> ${name}</p>
             <p><strong>البريد:</strong> ${email}</p>
             <p><strong>الرسالة:</strong><br/>${message}</p>`,
        });

        res.sendStatus(200);
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ error: "فشل في إرسال الرسالة" });
    }
});

module.exports = router;
