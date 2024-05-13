const User = require("../models/user");
const { validateUsername } = require("../helpers/validation");

exports.register = async (req, res) => {
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

		res.status(200).send({ user });
	} catch (err) {
		console.log("unable to register user", err);
		res.status(500).send({ error: "Unable to register user" });
	}
};
