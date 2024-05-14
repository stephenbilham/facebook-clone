const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(
	MAILING_ID,
	MAILING_SECRET,
	MAILING_REFRESH,
	oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
	auth.setCredentials({
		refresh_token: MAILING_REFRESH,
	});
	const accessToken = auth.getAccessToken();
	const stmp = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: EMAIL,
			clientId: MAILING_ID,
			clientSecret: MAILING_SECRET,
			refreshToken: MAILING_REFRESH,
			accessToken,
		},
	});

	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: "Facebook email verification",
		html: `<div style="max-width:800px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;background-color:#f9f9f9"><div style="text-align:center;margin-bottom:20px"><img src="./assets/logo.png" alt="Facebook Logo" style="width:100px"><h1 style="color:#3b5998;font-size:24px;font-weight:700">Activate Your Facebook Account</h1></div><div style="background-color:#fff;padding:30px;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,.1)"><p style="font-size:16px;margin-bottom:20px">Hello there ${name}!</p><p style="font-size:16px;margin-bottom:20px">You've recently created an account on Facebook. To complete your registration, please confirm your account by clicking the button below.</p><a href=${url} style="display:inline-block;padding:10px 20px;background-color:#4c649b;color:#fff;text-decoration:none;font-weight:700;border-radius:5px">Confirm Your Account</a></div><div style="text-align:center;margin-top:20px"><p style="color:#666;font-size:14px">Facebook allows you to stay in touch with all your friends. Once registered, you can share photos, organize events, and much more.</p></div></div>`,
	};

	stmp.sendMail(mailOptions, (err, res) => {
		if (err) {
			return err;
		}
		return res;
	});
};
