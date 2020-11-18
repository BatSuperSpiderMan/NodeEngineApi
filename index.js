const config = require("config");
const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
//const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./middleware/logger");
const products = require("./routes/products");
const events = require("./routes/events");
const home = require("./routes/home");
// const trading = require("./routes/trading");
// const tradingEvent = require("./routes/tradingEvent");
const users = require("./routes/users");
const auth = require("./routes/auth");
const tradepost = require("./routes/tradepost");
const market = require("./routes/market");
const agent = require("./routes/agent");
const express = require("express");
const app = express();

/*if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey not defined");
  process.exit(1);
}*/

mongoose
  .connect("mongodb://localhost/ABTradingEngine", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.set("view engine", "pug");
app.set("views", "./views"); //default

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/products", products);
app.use("/api/events", events);
app.use("/api/users", users);
app.use("/api/auth", auth);
//app.use("/api/trading", trading);
//app.use("/api/tradingEvent", tradingEvent);
app.use("/api/tradepost", tradepost);
app.use("/api/market", market);
app.use("/api/agent", agent);
app.use("/", home);

//Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
//console.log("Mail Password: " + config.get("mail.password"));*/

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}
app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
