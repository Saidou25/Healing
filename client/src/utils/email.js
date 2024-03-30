import emailjs from "@emailjs/browser";

let ok;
let notOk;
let ok1;
let notOk1;

const sendEmail = (templateParams) => {
  const SERVICE_ID = "service_g15laob";
  const TEMPLATE_ID = "template_rels3en";
  const USER_ID = "RWSohpTYy2zdo_uXO";

  if (!templateParams) {
    ok1 = "";
    notOk1 = "";
    return;
  }
  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
    (result) => {
      ok1 = result.text;
    },
    (error) => {
      notOk1 = error.text;
    }
  );
};

const sendMessage = async (templateParams) => {
  const SERVICE_ID = "service_g15laob";
  const TEMPLATE_ID = "template_s6gfci4";
  const USER_ID = "RWSohpTYy2zdo_uXO";

  if (!templateParams) {
    ok = "";
    notOk = "";
    return;
  }
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

export { sendEmail, sendMessage, ok, notOk, ok1, notOk1 };
