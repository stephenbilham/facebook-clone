const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello from the router!");
});

router.get("/user", (req, res) => {
	res.send("Hi i'm the user 2342");
});

module.exports = router;
