"use strict";

const express = require("express");
const process = require("process");
const path = require("path");
const app = express();

app.use(express.static(__dirname));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/config", (req, res) => {
    res.send({
        api: process.env.ANTHRO_API ? process.env.ANTHRO_API : "http://localhost:8090/"
    });
});

const PORT = process.env.PORT || 1130;

app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
});;