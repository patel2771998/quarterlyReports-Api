 const db = require("../models");
var CronJob = require('cron').CronJob;
const Follow = db.follow
const User = db.user
const {sendMail} = require('../config/Sendmail.js');
const { GetApiCall } = require('../config/ApiServices');



const dbConfig = require("../config/db.config.js");
  async function checkReports() {
  const followsend = async () =>{
    const follow = await Follow.findAll()
    if(!!follow  && follow.length > 0){
        for(var i=0;i<follow.length;i++){
        var  earningUrl  = 'https://www.alphavantage.co/query?function=EARNINGS&symbol='+follow[i].symbol+'&apikey='+ dbConfig.apikey 
        var headers = { 'User-Agent': 'request' }
        const earning = await GetApiCall(earningUrl, headers);
            if(earning.quarterlyEarnings[0].fiscalDateEnding != follow[i].fiscalDateEnding){
                console.log("date is change")
                const quarterlyReportsUrl= 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol='+follow[i].symbol+'&apikey='+ dbConfig.apikey
                const quarterlyReports = await GetApiCall(quarterlyReportsUrl, headers);
                const userDetail =  await  User.findOne({where:{id:follow[i].id_user}})
                const mailData = {
                    to: userDetail.email,
                    subject:quarterlyReports ,
                }
                const sendmail = await sendMail(mailData)
                const updateFollow = await Follow.update({fiscalDateEnding:follow[i].fiscalDateEnding},{where:{id:follow[i].id}})
            }
            console.log('date is not change');
        }
    }

  }

    var job = new CronJob('21 11 * * *', async function test() {
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