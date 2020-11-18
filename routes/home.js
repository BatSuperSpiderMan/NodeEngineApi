const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "AB Trading Engine", message: "Hello" });
});

module.exports = router;
