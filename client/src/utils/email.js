import emailjs from "@emailjs/browser";

let ok;
let notOk;

console.log(notOk);
console.log(ok);

const sendEmail = (templateParams) => {
console.log("template params", templateParams)
  const SERVICE_ID = "service_g15laob";
  const TEMPLATE_ID = "template_rels3en";
  const USER_ID = "RWSohpTYy2zdo_uXO";

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
    (result) => {
      console.log(result.text);
    },
    (error) => {
      console.log(error.text);
    }
  );
};

const sendMessage = async (templateParams) => {
  if (!templateParams) {
    ok = "";
    notOk = "";
    return;
  }

  const SERVICE_ID = "service_g15laob";
  const TEMPLATE_ID = "template_s6gfci4";
  const USER_ID = "RWSohpTYy2zdo_uXO";

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
    (result) => {
      notOk = "";
      ok = result.text;
      setTimeout(() => {
        ok = "";
      }, 2000);
      return;
    },
    (error) => {
      ok = "";
      notOk = error.text;
    }
  );
};

export { sendEmail, sendMessage, ok, notOk };
