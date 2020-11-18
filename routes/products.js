//const { Product, validate } = require("../models/products");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/create/", async (req, res) => {
  const { error } = Product.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    group: req.body.group,
    owner: req.body.owner,
    isForSale: req.body.isForSale,
    description: req.body.description,
    // numberInStock: req.body.numberInStock,
    //purchaseRate: req.body.purchaseRate,
    date: new Date(),
  });

  await product.save();
  res.send(product);
});

router.post("/create/multi", async (req, res) => {
  const products = req.body.products;

  products.forEach(async (element) => {
    const { error } = Product.validate(element);

    if (error) return res.status(400).send(error.details[0].message);
    const product = new Product({
      name: element.name,
      price: element.price,
      group: element.group,
      owner: element.owner,
      purchaseRate: req.body.purchaseRate,
      description: req.body.description,
      date: new Date(),
    });

    const result = await product.save();
  });

  res.send(products);
});

router.put("/:id", async (req, res) => {
  const { error } = Product.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.owner = req.body.owner;
  product.price = req.body.price;
  product.group = req.body.group;
  product.isForSale = req.body.isForSale;
  /*product.numberInStock = req.body.numberInStock;
  product.purchaseRate = req.body.purchaseRate;*/
  product.description = req.body.description;

  const result = await product.save();
  console.log(result);

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");

  res.send(product);
});

router.delete(
  "/:id",
  /*[admin],*/ async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found!");

    res.send(product);
  }
);

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");
  res.send(product);
});

module.exports = router;
