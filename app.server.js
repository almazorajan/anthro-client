
const express = require("express");
const app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/'));

app.listen(process.env.PORT || 80000, () => {

    console.log("listening to " + (process.env.PORT || 80000));
    console.log("dir", (process.env.PWD + '/'));

});
