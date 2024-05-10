const User = require("../models/user");

exports.register = async (req, res) => {
	try {
		const userObj = ({
			first_name,
			last_name,
			username,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body);

		const user = await new User(userObj).save();
		res.status(200).send({ user });
	} catch (err) {
		console.log("unable to register user", err);
	}
};
