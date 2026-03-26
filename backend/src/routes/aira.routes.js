// const express = require("express");
// const router = express.Router();
// const airaController = require("../controllers/aira.controller");

// router.post("/chat", airaController.chat);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { chatWithAira } = require("../controllers/aira.controller");

router.post("/chat", chatWithAira);

module.exports = router;
