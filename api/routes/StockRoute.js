const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
  const stock = require("../controllers/StockController.js");

  app.post("/api/stock/list", stock.list);

  app.post("/api/stock/follow", [authJwt.verifyToken], stock.follow);

  app.post("/api/stock/unfollow", [authJwt.verifyToken], stock.unfollow)

};