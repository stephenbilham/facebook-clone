const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");

const { OAuth2 } = google.auth;
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH_TOKEN } =
	process.env;

const oauthlink = "https://developers.google.com/oauthplayground";

const auth = new OAuth2({
	MAILING_ID,
	MAILING_REFRESH_TOKEN,
	MAILING_SECRET,
});

exports.sendVerificationEmail = (email, name, url) => {
	auth.setCredentials({
		refresh_token: MAILING_REFRESH_TOKEN,
	});
	const access_token = auth.getAccessToken();
	const stmp = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: OAuth2,
			user: EMAIL,
			clientId: MAILING_ID,
			clientSecret: MAILING_SECRET,
			refreshToken: MAILING_REFRESH_TOKEN,
			access_token,
		},
	});
	const mailOptions = {
		from: "EMAIL",
		to: email,
		subject: "Facebook email verification",
		html: ``,
	};
	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return err;
		return res;
	});
};
