import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_ps339pa';
const TEMPLATE_ID = 'template_rels3en';
const USER_ID = 'RWSohpTYy2zdo_uXO';

const sendEmail = (templateParams) => {
    emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID,
    )
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        })
};
export { sendEmail };