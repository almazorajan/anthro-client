"use strict";

const express = require("express");
const app = express();

app.use(express.static("./"));

app.listen(1100, () => {
    console.log("Client is now listening to 1100");
});