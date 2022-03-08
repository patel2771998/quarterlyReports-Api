const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
const db = require("./api/models");
const dbConfig = require("./api/config/db.config.js");
const reports = require("./api/controllers/CheckReportsController.js")


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
reports.checkReports();


require("./api/routes/UserRoute.js")(app);
require("./api/routes/StockRoute.js")(app);

app.listen(dbConfig.PORT, () => {
  console.log(`Server is running on port ${dbConfig.PORT}.`);
});