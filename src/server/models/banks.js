const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BanksSchema = new mongoose.Schema({
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

const Banks = mongoose.model("banks", BanksSchema);
module.exports = Banks;
