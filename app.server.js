
const express = require("express");
const app = express();

app.use(express.static("./"));

app.listen(process.env.PORT || 80000);
console.log("listening to " + (process.env.PORT || 80000));