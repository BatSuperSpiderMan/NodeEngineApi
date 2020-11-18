const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  group: String,
  owner: String,
  /*numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  }*/
  isForSale: Boolean,
  description: String,
  date: Date,
});

module.exports = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    id: ObjectId,
    name: Joi.string().min(3).required(),
    price: Joi.number(),
    group: Joi.string().min(3).required(),
    owner: Joi.string().min(3).required(),
    isForSale: Joi.bool(),
    description: Joi.string(),
    date: Joi.date(),
  };
  return Joi.validate(product, schema);
}
exports.validate = validateProduct;
