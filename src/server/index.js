/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const APP_PORT = 7777;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support enco

// Connect Mongodb
mongoose
    .connect("mongodb://dev:dev@localhost:27017/trouvkash", {
        authSource: "admin",
        useNewUrlParser: true,
    })
    .catch(err => {
        console.error("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

// Schema terminals
const terminalSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    address: String,
    bank: mongoose.Schema.Types.ObjectId,
    empty: Boolean,
    created_at: String,
    update_at: String,
    deleted_at: String,
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
    terminals.find({}, (err, ok) => {
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

app.get("/atm/[0-9A-Za-z]+", (req, res) => {
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);

    // eslint-disable-next-line prettier/prettier
    terminals.findOne({ _id: req.url.split("/")[2] }, (err, ok) => {
        if (err) {
            res.send(
                JSON.stringify({
                    error: err,
                    message: `We cannot retrieve the details of ATM ${
                        req.url.split("/")[2]
                    }`,
                }),
            );
        }
        res.send(JSON.stringify(ok));
    });
});
app.post("/atm/[0-9A-Za-z]+", (req, res) => {
    console.log(`(${req.method.toUpperCase()}))${req.url}`); // choper es param du post
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    terminals(
        {
            latitude,
            longitude,
        },
        err => {
            console.log(err);
        },
    ).save();
    res.send(`${latitude}+${longitude}`);
});
//Checking if db has data
app.get("/profile", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

    terminals
        .find({address: "Mechelen"})
        .then(search => {
            res.send({
                confirmation: "success",
                data: search,
            });
        })
        .catch(err => {
            err.send({
                confirmation: "fail",
            });
        });
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
