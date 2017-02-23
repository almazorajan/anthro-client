"use strict";

const express = require("express");
const process = require("process");
const app = express();

app.use(express.static("./"));

const config = {
    port: process.pid ? process.pid : 1100,
    name: "anthro-client"
};

app.listen(config.port, () => {
    console.log(`${config.name} is now listening to ${config.port}`);
});