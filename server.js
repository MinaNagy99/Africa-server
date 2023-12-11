const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "info@cts-egy.com", // Replace with your Gmail email address
        pass: "ccfn fhvr tszn wxvi", // Replace with your Gmail password or app-specific password
    },
});

app.post("/submit", async (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: "info@cts-egy.com", // Replace with your Gmail email address
        to: "mohamedup2002@gmail.com", // Replace with the recipient's email address
        subject: "New Africa Queen Form Submission",
        html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit form" });
    }
});

app.listen(process.env.PORT||port, () => {
    console.log(`Server is running on port ${port}`);
});
