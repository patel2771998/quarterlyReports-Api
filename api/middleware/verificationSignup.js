const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log(req.body.user_name)
    console.log(req.body.email)
    User.findAll({ where: { user_name: req.body.user_name } })
        .then(data => {
            if (data.length == 0) {
                User.findAll({ where: { email: req.body.email } })
                    .then(data => {
                        if (data.length == 0) {
                            next();
                        } else {
                            return res.status(400).send({
                                status: false,
                                message: "Failed! email is already in use!"
                            });
                        }
                    })
                    .catch(err => {
                        return res.status(500).send({
                            status: false,
                            message: err.message || "Some error occurred while retrieving users."
                        });
                    });
            } else {
                return res.status(400).send({
                    status: false,
                    message: "Failed! Username is already in use!"
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                status: false,
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};


const verificationUserId = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verificationUserId;


