const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const MarketSchema = new Schema({
    id: ObjectId,
    name: String,
    defaultproductpricing: Array,
    date: Date
});

module.exports = mongoose.model("Market", MarketSchema)