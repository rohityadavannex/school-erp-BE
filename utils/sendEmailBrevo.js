const brevo = require("@getbrevo/brevo");

brevo.setApiKey(process.env.SENDIN_BLUE_API_KEY); // Replace with your actual API key

module.exports = {
  brevo,
};
