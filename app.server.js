
const express = require("express");
const app = express();

app.use(express.static("./"));

app.listen(80000);
console.log("listening to 80000");