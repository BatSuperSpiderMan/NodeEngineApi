const { Trading, validate } = require("../models/trading");
const { Product } = require("../models/products");
const { Agent } = require("../models/agents");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tradings = await Trading.find();
  res.send(tradings);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const agent = await Customer.findById(req.body.agentId);
  if (!agent) return res.status(400).send("Invalid customer.");

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid product.");

  if (product.numberInStock === 0)
    return res.status(400).send("Product not in stock.");

  let trading = new Trading({
    agent: {
      _id: agent._id,
      name: agent.name,
      wallet: agent.wallet,
    },
    product: {
      _id: product._id,
      name: product.title,
      owner: product.owner,
      purchaseRate: product.purchaseRate,
    },
  });
  trading = await trading.save();

  product.numberInStock--;
  product.save();

  res.send(product);
});

module.exports = router;
