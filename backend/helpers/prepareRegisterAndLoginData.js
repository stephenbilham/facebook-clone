const { generateToken } = require("./tokens");

exports.prepareRegisterAndLoginData = (user) => {
	const token = generateToken({ id: user._id.toString() }, "7d");
	const responseData = {
		id: user._id.toString(),
		username: user.username,
		picture: user.picture,
		first_name: user.first_name,
		last_name: user.last_name,
		token,
		verified: user.verified,
	};
	return responseData;
};
