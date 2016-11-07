
const express = require("express");
const path = require("path");
const app = express();
const localPort = 8000;

const staticPath = path.join(__dirname, "");

app.use("/", express.static("./"));

app.listen(process.env.PORT || localPort, () => {

    console.log("listening to " + (process.env.PORT || localPort));
    //console.log("dir", staticPath);

});
