const db = require("../models");
var CronJob = require('cron').CronJob;
const Follow = db.follow
const User = db.user
const { sendMail } = require('../config/Sendmail.js');
const { GetApiCall } = require('../config/ApiServices');
const dbConfig = require("../config/db.config.js");



async function checkReports() {
    const followsend = async () => {
        const follow = await Follow.findAll()
        if (!!follow && follow.length > 0) {
            console.log('job start')
            for (var i = 0; i < follow.length; i++) {
                var earningUrl = 'https://www.alphavantage.co/query?function=EARNINGS&symbol=' + follow[i].symbol + '&apikey=7T0IJKBS7WSUY4FV' + dbConfig.apikey
                var headers = { 'User-Agent': 'request' }
                const earning = await GetApiCall(earningUrl, headers);
                console.log(earning.quarterlyEarnings[0].fiscalDateEnding, follow[i].fiscalDateEnding)
                if (earning.quarterlyEarnings[0].fiscalDateEnding != follow[i].fiscalDateEnding) {
                    console.log("date is change")
                    const quarterlyReportsUrl = 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=' + follow[i].symbol + '&apikey=' + dbConfig.apikey
                    const quarterlyReports = await GetApiCall(quarterlyReportsUrl, headers);
                    const userDetail = await User.findOne({ where: { id: follow[i].id_user } })
                    var  mailData = {
                        to: userDetail.email,
                        subject: 'quarterlyReports',
                        report:quarterlyReports
                    }
                    const sendmail = await sendMail(mailData)
                    const updateFollow = await Follow.update({ fiscalDateEnding: earning.quarterlyEarnings[0].fiscalDateEnding}, { where: { id: follow[i].id } })
                    console.log('success fully send message')
                }
                console.log('date is not change');
            }
        }

    }

    var job = new CronJob('02 13 * * *', async function test() {
        try {
            const followMail = await followsend()
            // .then(() => {
            //     return updatetedInstrument().then(() => {
            //         return reOrder().then(() => {
            //             return updateInstrumentTokens(Instrument);
            //         })
            //     });
            // });
        }
        catch (error) {
            console.log('Job failed', error)
        }
    }, null, true, dbConfig.TZ);
    job.start();
}








module.exports = { checkReports }