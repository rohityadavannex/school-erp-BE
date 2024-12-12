var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  authMethod: "PLAIN",
  auth: {
    user: "rohit@annexlogics.com",
    pass: "annex@123",
  },
});

var mailOptions = {
  from: "rohit@annexlogics.com",
  to: "rajesh@annexlogics.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

exports.sendMail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
