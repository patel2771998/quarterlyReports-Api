var md5 = require('md5');
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator')
const {sendMail} = require('../config/Sendmail.js');

exports.create = async (req, res) => {
    if (!req.body.name || !req.body.user_name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "please enter required field!"
        });
    }
    try {
        const user = {
            name: req.body.name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: md5(req.body.password)
        };
        const userData = await User.create(user)
        var token = jwt.sign({ id: userData.id }, 'quartely_reports', {
            expiresIn: 86400
        });
        userData.password = "";
        var data = {
            status: true,
            token: token,
            userData: userData
        }
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: error.message || "Something went wrong."
        });
    }
};

exports.getProfile = (req, res) => {
    User.findAll({
        where: {
            id: req.userId
        }
    })
        .then(async data => {
            if (data.length != 0) {
                const userData = data[0];
                delete userData.dataValues.password;
                var accountArray = {
                    account: []
                }
                var newObject = Object.assign(userData.dataValues, accountArray);
                var dataObject = {
                    status: true,
                    message: "Login successfully!",
                    userData: newObject
                }
                res.send(dataObject);
            } else {
                res.status(400).send({
                    status: false,
                    message: "Email or Password not Match!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: err.message || "Something went wrong."
            });
        });
}

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var password = md5(req.body.password)
    User.findOne({
        where: {
            email: req.body.email,
            password: password
        }
    })
        .then(async data => {
            if (!! data  && data.length != 0) {
                var token = jwt.sign({ id: data.id }, 'quartely_reports', {
                    expiresIn: 86400 // 24 hours
                });
                const userData = data;
                delete userData.dataValues.password;
                var dataObject = {
                    status: true,
                    message: "Login successfully!",
                    token: token,
                    userData: userData
                }
                res.send(dataObject);
            } else {
                res.status(400).send({
                    status: false,
                    message: "Email or Password not Match!"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                status: false,
                message: err.message || "Something went wrong."
            });
        });
}


exports.edit = async (req, res) => {
    if (!req.body.name || !req.body.user_name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "please enter required field!"
        });
    }
    try {
        const user = {
            name: req.body.name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: md5(req.body.password)
        };
        const userData = await User.update(user, { where: { id: req.userId } })
        var data = {
            status: true,
            userData: req.body
        }
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: error.message || "Something went wrong."
        });
    }
};

exports.forgotPassword = async (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "please enter your email!"
        });
    }
    try {
        const userData = await User.findOne({ where: { email: req.body.email } })
        if(!!userData){
        }else{
            res.status(500).send({
                status: false,
                message: "Email Not found"
            });
            return;
        }
        try {
            const userData = await User.findOne({ where: { email: req.body.email } })
            let password = generatePassword();
            console.log(typeof password);
            const userupdate = await User.update({ password: md5(password) }, { where: { id: userData.id } })
            const sendMailData = {
                to: userData.email,
                subject: 'Forgot Password Request Received',
                text: 'You are received a request to forgot password of your account. The New Password is:' + password
            }
            console.log(password);
            sendMail(sendMailData);
            var data = {
                status: true,
                message: "Mail sent successfully."
            }
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error.message || "Something went wrong."
            });
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: "please enter your correct email."
        });
        return;
    }
};

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
exports.verifyOtp = async (req, res) => {
    if (!req.body.email || !req.body.otp) {
        return res.status(400).send({
            message: "please enter your otp!"
        });

    }
    try {
        const userData = await User.findOne({ where: { email: req.body.email } })
        try {
            if (!!userData) {
                const otp = userData.otp
                if (otp != req.body.otp) {
                    return res.status(500).send({
                        status: false,
                        message: "otp is wrong please  correct otp is enter "
                    });
                }
                var data = {
                    status: true,
                    data: "otp is successfully verify"
                }
                res.send(data)
            }else{
                res.status(500).send({
                    status: false,
                    message:  " please enter your correct email."
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status: false,
                message: error.message || "Something went wrong."
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: "please enter your correct email."
        });
    }
};


exports.createNewPassword = async (req, res) => {
    if (!req.body.newPassword || !req.body.confirmPassword) {
        return res.status(400).send({
            message: "please enter newPassword!"
        });
    }
    try {

        if(req.body.newPassword != req.body.confirmPassword){
            return res.status(500).send({
                status: false,
                message: "password is  not match"
            });
        }
        const user = {
            password: md5(req.body.newPassword)
        };
        const userData = await User.update(user, { where: { id: req.userId } })
        var data = {
            status: true,
            data: 'password  is succeessfully change'
        }
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: "Something went wrong."
        });
    }
};