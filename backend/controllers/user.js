const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateUsername } = require("../helpers/validation");
const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");

const register = async (req, res) => {
	let {
		first_name,
		last_name,
		username,
		email,
		password,
		bYear,
		bMonth,
		bDay,
		gender,
	} = req.body;

	if (!username) {
		username = (first_name.toLowerCase() + last_name.toLowerCase()).trim();
	}

	try {
		// Validate and obtain a unique username
		const validatedUsername = await validateUsername(username);

		// Create a new user with validated username
		const user = await new User({
			first_name,
			last_name,
			username: validatedUsername,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();

		const emailVerficationToken = generateToken(
			{ id: user._id.toString() },
			"30min"
		);
		const url = `${process.env.BASE_URL}/activate/${emailVerficationToken}`;
		sendVerificationEmail(user.email, user.first_name, url);

		const token = generateToken({ id: user._id.toString() }, "7d");
		res.status(200).send({
			id: user._id.toString(),
			username: user.username,
			picture: user.picture,
			first_name: user.first_name,
			last_name: user.last_name,
			token,
			verified: user.verified,
			message: "Register success, please activate your email to start.",
		});
	} catch (err) {
		console.log("unable to register user", err);
		res.status(500).send({ error: "Unable to register user" });
	}
};

const activateAccount = async (req, res) => {
	const { token } = req.body;
	const user = jwt.verify(token, process.env.TOKEN_SECRET);
	const userData = await User.findById(user.id);

	if (!userData) {
		console.log("User not found in database");
		return res.status(404).json({ error: "User not found" });
	}

	if (userData.verified) {
		res.status(400).send({ message: "This email is already activated." });
	}

	userData.verified = true;
	userData.save();
	res.status(200).send({ message: "Account has been verified successfully" });
};

module.exports = { register, activateAccount };
