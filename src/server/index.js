/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";
import mongoose from "mongoose";

const {APP_PORT} = process.env;

const app = express();

// Connect Mongodb
mongoose.connect("mongodb://dev:dev@localhost/trouvkash", err => {
    if (err) {
        throw err;
    }
});
// Schema terminals
/*
const terminalSchema = new mongoose.Schema({
    latitude: 'number',
    longitude: 'number',
    adress: "string",
    bank: "ObjectID",
    empty: "Boolean",
    created_at: "string",
    update_at: "string",
    deleted_at: "string"
});
*/
const terminalSchema = new mongoose.Schema({
    latitude: "number",
    longitude: "number",
});
const terminals = mongoose.model("terminal", terminalSchema);

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("change le !");
});
// List all atm
app.get("/atm", (req, res) => {
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);
    terminals.findOne({latitude: 51.0569}, ok => console.log(ok));
    res.send("fuck");
});

app.get("/atm/[0-9A-Za-z]+", (req, res) => {
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);
    // Grab ID
    // req.url = /atm/id
    // req.url.split('/') = [ '', 'atm', 'id' ]
    // req.url.split('/').length = la grandeur du tableau
    // Pour avoir le dernier élément il suffit de faire grandeur du tableau - 1
    //let urlArray = req.url.split('/')
    //let urlArraySize = req.url.split('/').length
    //res.send("L'id est " + urlArray[urlArraySize - 1]);
    res.send(`L'id est ${req.url.split("/")[2]}`);
});
app.post("/atm/[0-9]+", (req, res) => {
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);

    res.send(`L'id est ${req.url.split("/")[2]}`);
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
