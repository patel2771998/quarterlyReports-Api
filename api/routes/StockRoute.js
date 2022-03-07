const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
        const stock = require("../controllers/StockController.js");

    //     app.get("/api/stock/list",[authJwt.verifyToken], stock.list)

        // app.get("/api/stock/updateInstrumentTokens", stock.updateInstrumentTokens);

    //     app.post("/api/stock/price",[authJwt.verifyToken], stock.price);

    app.post("/api/stock/list", 
    //[authJwt.verifyToken]
    //,
     stock.list);

     app.post("/api/stock/follow",
    //  [authJwt.verifyToken],
      stock.follow);

      app.post("/api/stock/unfollow",
      //[authJwt.verifyToken],
      stock.unfollow)

    //     app.post("/api/stock/sendmail", stock.sendmail)
};