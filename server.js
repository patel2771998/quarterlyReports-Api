const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
const db = require("./api/models");
const dbConfig = require("./api/config/db.config.js");
//const fiill1 = require("./api/controllers/ReOrderController.js")
const moment = require('moment-timezone');
//moment.tz(Constants.TZ || "Asia/Kolkata").format();


// var whitelist = Constants.CorsAllowedURL;
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", (req, res) => {
  console.log('Application is running', new Date());
  res.json({ message: "Welcome to quarterlyReports application." });
});
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});
//fiill1.reOrder();


require("./api/routes/UserRoute.js")(app);
require("./api/routes/StockRoute.js")(app);

app.listen(dbConfig.PORT, () => {
  console.log(`Server is running on port ${dbConfig.PORT}.`);
});