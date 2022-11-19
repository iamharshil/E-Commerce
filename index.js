require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

const DB = require("./config/Database");
const User = require("./models/User.model");

// api
app.use("/api/", require("./routes/Api"));

// view
app.use("/", require("./routes/Ejs"));

app.listen(PORT, () => console.log(`[Server]: http://localhost:${PORT}`));
