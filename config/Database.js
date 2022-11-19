const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/e-commerce-app")
  .then(() => console.log("[Server]: Database Connected..."));
