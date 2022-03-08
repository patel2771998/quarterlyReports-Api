const sendmail = require('sendmail')();

const  sendMail = async (mailData) =>{
    try {
        const mail = sendmail({
            from: 'no-reply@quarterlyReports.com',
            to: mailData.to,
            subject: mailData.subject,
            text: mailData.text,
        });
        return mail;
    } catch (error) {
        throw error;
    }
}


module.exports = { sendMail }