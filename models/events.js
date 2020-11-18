const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  scope: String,
  affectedTradePost: String,
  affectedProductGroups: String,
  affectedProducts: String,
  priceEffect: Number,
});
Event = mongoose.model("Event", eventSchema);

function validateProduct(event) {
  const schema = {
    name: Joi.string().min(3).required(),
    scope: Joi.string().min(3).required(),
    affectedTradePost: Joi.string().min(3).required(),
    affectedProductGroups: Joi.string().min(3).required(),
    affectedProducts: Joi.string().min(3).required(),
    priceEffect: Joi.number().min(0).required(),
  };
  return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateProduct;
