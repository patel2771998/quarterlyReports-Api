const sendmail = require('sendmail')();

function sendMail(mailData) {
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