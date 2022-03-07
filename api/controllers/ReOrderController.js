 const db = require("../models");
var CronJob = require('cron').CronJob;
const Follow = db.follow
const sendmail = require('../config/Sendmail.js');
const { PostApiCall, GetApiCall } = require('../config/ApiServices');


const dbConfig = require("../config/db.config.js");
  async function reOrder() {
  const followsend = () =>{
    const follow = await Follow.findAll
    if(!!follow  && follow.length > 0){
        for(var i=0;i<follow.length;i++){
        var  earningUrl  = 'https://www.alphavantage.co/query?function=EARNINGS&symbol='+follow[i].symbol+'&apikey='+ dbConfig.apikey 
        var headers = { 'User-Agent': 'request' }
        const earning = await GetApiCall(earningUrl, headers);
            if(earning.quarterlyEarnings[0].fiscalDateEnding != follow[i].fiscalDateEnding){
                const quarterlyReportsUrl= 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol='+req.body.symbol+'&apikey='+ dbConfig.apikey
                const quarterlyReports = await GetApiCall(quarterlyReportsUrl, headers);
                const updateFollow = await Follow.update({fiscalDateEnding:follow[i].fiscalDateEnding},where:{id:follow[i].id})
                const userDetail =  await  User.findOne({where:{id:id_user}})
                const mailData = {
                    to: userdetail.email,
                    subject:quarterlyReports ,
                }
                const sendMail = await sendmail(mailData)
            }
        }
    }

  }

    var job = new CronJob('58 14 * * *', async function test() {
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








//  module.exports = { reOrder }