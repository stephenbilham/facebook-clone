const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateUsername } = require("../helpers/validation");
const {
	prepareRegisterAndLoginData,
} = require("../helpers/prepareRegisterAndLoginData");
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

		const responseData = prepareRegisterAndLoginData(user);

		res.status(200).send({
			...responseData,
			message: "Register success, please activate your email to start.",
		});
	} catch (err) {
		console.log("unable to register user", err);
		res.status(500).send({ error: "Unable to register user" });
	}
};

const activateAccount = async (req, res) => {
	try {
		const { token } = req.body;
		const user = jwt.verify(token, process.env.TOKEN_SECRET);
		const userData = await User.findById(user.id);

		if (!userData) {
			console.log("User not found in database");
			return res.status(400).json({ error: "User not found" });
		}

		if (userData.verified) {
			return res
				.status(400)
				.send({ message: "This email is already activated." });
		}

		userData.verified = true;
		await userData.save();

		return res
			.status(200)
			.send({ message: "Account has been verified successfully" });
	} catch (error) {
		console.error("Error verifying token:", error.message);
		return res.status(400).json({ error: "Invalid token" });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).send({
				message: "This email you entered in not connected to an account.",
			});
		}

		const match = await user.matchPassword(password);

		if (!match) {
			return res.status(400).send({ message: "invalid password or username" });
		}

		if (user && match) {
			const responseData = prepareRegisterAndLoginData(user);
			res.status(200).send({
				...responseData,
				message: "Login success",
			});
		}
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};

module.exports = { register, activateAccount, login };
