const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { token } = require("morgan");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("name").select("-password");
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user)
    return res.status(404).send("The user with the given ID was not found!");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "wallet", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res.send(_.pick(user, ["_id", "name", "email", "wallet"]));
});

router.put("/:id", async (req, res) => {
  const { error } = User.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id).select("-password");
  user.name = req.body.name;
  user.email = req.body.email;
  user.wallet = req.body.wallet;

  const result = await user.save();
  console.log(result);

  if (!user)
    return res.status(404).send("The user with the given ID was not found!");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found!");

  res.send(user);
});

module.exports = router;
