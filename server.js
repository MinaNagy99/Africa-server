const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
	host: "smtp.titan.email",
	port: 465,
	secure: true,
	auth: {
		user: "info@africa-queen.com", // Replace with your Gmail email address
		pass: "Africa@queen", // Replace with your Gmail password or app-specific password
	},
});

app.post("/submit", async (req, res) => {
	const { name, email, phone, message } = req.body;

	const mailOptions = {
		from: "info@africa-queen.com", // Replace with your Gmail email address
		to: "info@africa-queen.com", // Replace with the recipient's email address
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

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
