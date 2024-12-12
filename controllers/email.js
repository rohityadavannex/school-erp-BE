const axios = require("axios");

const sendEmail = async (email, subject, htmlContent) => {
  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.SENDIN_BLUE_API_KEY, // Ensure this is correct and in lowercase
  };

  const data = {
    sender: { email: "ravi@annexlogics.com" },
    to: [{ email: email }],
    subject: subject,
    htmlContent: htmlContent,
  };

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      data,
      { headers }
    );
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error.response.data);
  }
};

module.exports = { sendEmail };
