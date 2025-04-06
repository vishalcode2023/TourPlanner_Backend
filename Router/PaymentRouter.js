const express = require("express");
const router = express.Router();
const { createOrder } = require("../Controller/PaymentController");

router.post("/create-order", createOrder);

module.exports = router;
