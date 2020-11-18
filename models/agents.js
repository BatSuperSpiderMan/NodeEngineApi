const Joi = require("joi");
const mongoose = require("mongoose");

const Agent = mongoose.model(
  "Agent",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    Wallet: {
      type: Number,
      min: 0,
    },
    profile: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    balance: Number,
    tradepost: Array,
    products: Array,
    date: Date
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Agent;
exports.validate = validateCustomer;
