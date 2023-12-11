const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
var morgan = require('morgan')

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('combined'))

// Create a reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "info@cts-egy.com", // your Gmail email
    pass: "ccfn fhvr tszn wxvi",
  },
});

app.post("/submit", (req, res) => {
  const {  name, phone, email, message } = req.body;

  let mailOptions = {
    from: "info@cts-egy.com",
    to: "kamel.mamdouh@cts-egy.com",
    subject: "New Africa Queen Form Submission",
    html: `
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Message:</strong> ${message}</p>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to send email",
        details: error,
      });
    } else {
      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ success: true });
    }
  });
});

app.listen(process.env.PORT||port, () => {
  console.log(`server is running on port ${port}`);
});
