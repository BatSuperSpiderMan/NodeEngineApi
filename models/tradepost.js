const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const TradePostSchema = new Schema({
    id: ObjectId,
    market: {
        type: Array
    },
    products: Array,
    name: String,
    date: Date
});

module.exports = mongoose.model("TradePost", TradePostSchema)