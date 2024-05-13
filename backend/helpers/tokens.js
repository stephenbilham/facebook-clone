const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.generateToken = (payload, expired) => {
	return jwt.sign(payload, process.env.TOKEN, { expiresIn: expired });
};
