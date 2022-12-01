require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

const DB = require("./config/Database");
const User = require("./models/User.model");

app.use(function (req, res, next) {
  cors({ exposedHeaders: "auth-token" });
  next();
});

// api
app.use("/api/", require("./routes/Api"));
// view
app.use("/", require("./routes/View"));

app.listen(PORT, () => console.log(`[Server]: http://localhost:${PORT}`));
