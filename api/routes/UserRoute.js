const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/UserController.js");

    app.post("/api/user/register",
    [verifySignUp.checkDuplicateUsernameOrEmail],
      users.create);

    app.post("/api/user/login", users.login);

    app.post("/api/user/edit",[authJwt.verifyToken], users.edit);

    app.post("/api/user/forgotPassword",[authJwt.verifyToken], users.forgotPassword);

    app.post("/api/user/verifyOtp",[authJwt.verifyToken], users.verifyOtp);

    app.post("/api/user/createNewPassword",[authJwt.verifyToken], users.createNewPassword);
   
};