const { Event, validate } = require("../models/events");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find().sort("name");
  res.send(events);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let event = new Event({
    name: req.body.name,
    scope: req.body.scope,
    affectedTradePost: req.body.affectedTradePost,
    affectedProductGroups: req.body.affectedProductGroups,
    affectedProducts: req.body.affectedProducts,
    priceEffect: req.body.priceEffect,
  });
  event = await event.save();
  res.send(event);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const event = await Event.findById(id);
  event.name = req.body.name;
  event.scope = req.body.scope;
  event.affectedTradePost = req.body.affectedTradePost;
  event.affectedProductGroups = req.body.affectedProductGroups;
  event.affectedProducts = req.body.affectedProducts;
  event.priceEffect = req.body.priceEffect;

  const result = await product.save();
  console.log(result);

  if (!event)
    return res
      .status(404)
      .send("The trade event with the given ID was not found!");

  res.send(event);
});

router.delete("/:id", async (req, res) => {
  const event = await Event.findByIdAndRemove(req.params.id);

  if (!event)
    return res
      .status(404)
      .send("The trade event with the given ID was not found!");

  res.send(event);
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event)
    return res
      .status(404)
      .send("The trade event with the given ID was not found!");
  res.send(event);
});
module.exports = router;
