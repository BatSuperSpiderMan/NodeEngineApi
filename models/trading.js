const Joi = require("joi");
const mongoose = require("mongoose");

const Trading = mongoose.model(
  "Trading",
  new mongoose.Schema({
    agent: {
      type: new mongoose.Schema({
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
      }),
      required: true,
    },

    //** */
    product: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
      }),
      required: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    group: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

function validateTrading(product) {
  const schema = {
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
  };
  return Joi.validate(product, schema);
}

exports.Trading = Trading;
exports.validate = validateTrading;
