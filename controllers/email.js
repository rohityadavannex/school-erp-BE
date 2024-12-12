const axios = require("axios");

const sendEmail = async (email, subject, htmlContent) => {
  const headers = {
    "Content-Type": "application/json",
    "api-key":
      "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", // Ensure this is correct and in lowercase
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
