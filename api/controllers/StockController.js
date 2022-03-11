const {GetApiCall } = require('../config/ApiServices');
const db = require("../models");
const Follow =  db.follow
const dbConfig = require("../config/db.config.js");


exports.list = async (req, res) => {
    if (!req.body.symbol) {
        return res.status(400).send({
            status: false,
            message: "please enter a symbol!"
        });
    }
    try { 
       
        const earningUrl = 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol='+req.body.symbol+'&apikey='+ dbConfig.apikey
        var headers = { 'User-Agent': 'request' }
        const earning = await GetApiCall(earningUrl, headers);
        if(!!earning && Object.keys(earning).length > 0){
            var data = {
                status : true,
                data : earning
            }
        }else{
            var data = {
                status : false,
                data :'result not found'
            }
        }
        res.send(data)
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "Something went wrong."
        });
    }
};


exports.follow = async (req, res) => {
    if (!req.body.symbol  || !req.body.fiscalDateEnding) {
        return res.status(400).send({
            status: false,
            message: "please enter a required filed!"
        });
    }
    try {
       const followData = {
           id_user : req.userId,
           symbol : req.body.symbol,
           fiscalDateEnding: req.body.fiscalDateEnding,
        }
        const follow = await Follow.create(followData)
        var data = {
            status : true,
            data : 'successfully  follow   ' + req.body.symbol
        }
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: error.message || "Something went wrong."
        });
    }
};


exports.unfollow = async (req, res) => {
    if (!req.body.symbol  || !req.body.fiscalDateEnding) {
        return res.status(400).send({
            status: false,
            message: "please enter a required filed!"
        });
    }
    try {
        const unFollow = await Follow.destroy({where:{symbol:req.body.symbol,id_user:req.userId}})
        var data = {
            status : true,
            data : 'successfully  unfollow  ' + req.body.symbol
        }
        res.send(data)
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "Something went wrong."
        });
    }
};

exports.checkFollow = async (req, res) => {
    if (!req.body.symbol) {
        return res.status(400).send({
            status: false,
            message: "please enter a required filed!"
        });
    }
    try {
        
        const follow = await Follow.findOne({where:{id_user:req.userId,symbol:req.body.symbol}})
        if(!!follow){
            var data = {
                status : true,
                data : follow
            }
        }else{
            var data = {
                status : false,
                data : follow
            }
        }
        
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: error.message || "Something went wrong."
        });
    }
};


