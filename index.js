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

const DB = require("./config/Database");
const User = require("./models/User.model");

// api
app.use("/api/", require("./routes/Api"));

app.listen(PORT, () => console.log(`[Server]: http://localhost:${PORT}`));
