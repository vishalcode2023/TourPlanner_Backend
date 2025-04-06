const express = require("express");
const router = express.Router();
const { getGoogleAiResponse } = require("../Controller/GoogleAiController");

router.get("/get-response", getGoogleAiResponse); // Use POST for sending prompts

module.exports = router;
