const User = require("../models/user");

const validateUsername = async (username) => {
	let newUsername = username;
	let user = await User.findOne({ username });
	let suffix = 1;

	// If the username exists, keep adding a suffix until it becomes unique
	while (user) {
		newUsername = `${username}${suffix}`;
		user = await User.findOne({ username: newUsername });
		suffix++;
	}
	return newUsername;
};

module.exports = { validateUsername };
