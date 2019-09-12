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

app.get("/hello", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send("Hey jfjdhfjsfjkls");
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
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
        console.log("mansan");
    });
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

// Create a pre-save hook
/*    module.exports = function timestamp(banksSchema) {

        // Add the two fields to the schema
        banksSchema.add({ 
            name: String,
            country: String,
            color: String,
            icon: String,
            url: String,
            created_at: String,
            updated_at: String,
            deleted_at: String,
             // Create a pre-save hook
           
  }) */
/*  banksSchema.getUsers()
  .then(docs => {
    console.log(docs)
  })
  .catch(err => {
    console.error(err)
  }) */
//};

//module.exports = mongoose.model("id", banksSchema);
