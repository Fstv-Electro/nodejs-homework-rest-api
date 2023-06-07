require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SG_APIKEY, SG_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SG_APIKEY);

const sendEmailSG = async (data) => {
  const mail = { ...data, from: SG_SENDER_EMAIL };

  await sgMail
    .send(mail)
    .then(() => console.log("email send success"))
    .catch((error) => console.log(error.message));
  return true;
};

module.exports = sendEmailSG;
