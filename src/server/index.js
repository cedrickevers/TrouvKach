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
const cors = require("cors");

const APP_PORT = 7778;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support enco

// add cors manage
app.use(cors());

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
//List all atm
app.get("/atm", (req, res) => {
    // /atm?latitude=xxx&longitude=yyy
    // req.query.latitude => xxx
    // req.query.longitude => yyy
    // .find({ latitude: { $gt: 40.505, $lt: 60.505}, longitude: { $gt: -5.09, $lt: 5.09} } )
    let latGT = parseFloat(req.query.latitude) - 0.1;
    let lngGT = parseFloat(req.query.longitude) - 0.5;
    let lngLT = parseFloat(req.query.longitude) + 0.25;
    let latLT = parseFloat(req.query.latitude) + 0.25;

    terminals.find(
        {
            latitude: {$gt: latGT, $lt: latLT},
            longitude: {
                $gt: lngGT,
                $lt: lngLT,
            },
        },
        (err, ok) => {
            if (err) {
                res.send(
                    JSON.stringify({
                        error: err,
                        message: "We cannot retrieve the ATM list",
                    }),
                );
            }
            res.send(JSON.stringify(ok));
        },
    );
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
    terminals.findOne({_id: req.url.split("/")[2]}, (err, ok) => {
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
    console.log(`(${req.method.toUpperCase()})) ${req.url}`);
    // choper es param du post
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    terminals(
        {
            latitude,
            longitude,
        },
        (err, ok) => {
            console.log(err);
        },
    ).save();
    res.send(`${latitude}+${longitude}`);
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

/*./node_modules/.bin/nodemon src/server/index.js */
