import emailjs from "@emailjs/browser";

const sendEmail = (templateParams) => {
  // console.log("form utils", templateParams);
  const SERVICE_ID = "service_g15laob";
  const TEMPLATE_ID = "template_rels3en";
  const USER_ID = "RWSohpTYy2zdo_uXO";

  // emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
  //   (result) => {
  //     console.log(result.text);
  //   },
  //   (error) => {
  //     console.log(error.text);
  //   }
  // );
};
const sendMessage = (templateParams) => {
  // console.log(templateParams);
  const SERVICE_ID = "service_g15laob";
  const TEMPLATE_ID = "template_s6gfci4";
  const USER_ID = "RWSohpTYy2zdo_uXO";

  // console.log("from utils", templateParams);
  // emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
  //   (result) => {
  //     console.log(result.text);
  //   },
  //   (error) => {
  //     console.log(error.text);
  //   }
  // );
};

export { sendEmail, sendMessage };
