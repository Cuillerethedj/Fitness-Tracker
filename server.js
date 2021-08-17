const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models/workout")
const apiRoutes = require("./routes/apiRoutes.js")
const viewRoutes = require("./routes/htmlRoutes")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true,useUnifiedTopology: true});

app.use("/",apiRoutes);
app.use("/",viewRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = db;