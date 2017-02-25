
const express = require("express");
const process = require("process");
const path = require("path");
const app = express();

app.use(express.static(__dirname));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 1130;

app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
});;