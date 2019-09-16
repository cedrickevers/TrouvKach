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
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

//Indique le port à écouter.

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

//Permet l'indentification à la data-base qui dans le containeur-docker appelé mongo.Envoi un message dans la console une fois connecté.
mongoose
    .connect("mongodb://mongo:27017/admin", {
        authSource: "admin",
        user: "dev",
        pass: "dev",
        dbName: "trouvkash", // 'mydb' which is the default selected DB
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
    })
    .then(() => {
        console.log("Success mongo");
    });

//Permet d'aller chercher le model  des terminals construits dans le dossier model, et l'enregistre dans une variable appelée Terminal.
const Terminals = require("./models/terminals");
const Banks = require("./models/banks");

//Lorsque l'on écrit atm dans l'url, il fetch les données depuis mongo et les renvoi.

app.get("/terminals", (req, res) => {
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);
    Terminals.find({}, (err, ok) => {
        if (err) {
            res.send(
                JSON.stringify({
                    error: err,
                    message: "We cannot retrieve the ATM list",
                }),
            );
        }
        res.send(JSON.stringify(ok));
    });
});

app.get("/banks", (req, res) => {
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);
    Banks.find({}, (err, ok) => {
        if (err) {
            res.send(
                JSON.stringify({
                    error: err,
                    message: "We cannot retrieve the ATM list",
                }),
            );
        }
        res.send(JSON.stringify(ok));
    });
});

//Tu peux voire dans la console la longitude et la latitude de ton public ip addresse.
