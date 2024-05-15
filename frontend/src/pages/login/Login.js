import "./styles.css";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput/LoginInput";

const Login = () => {
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});

	const loginValidation = Yup.object({
		email: Yup.string()
			.email("Invalid email")
			.required("Email is a required field")
			.max(100),
		password: Yup.string().required("Password is a required field"),
	});

	const handleFormValues = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<div className="login">
			<div className="login_wrapper">
				<div className="login_wrap">
					<div className="login_1">
						<img src="../../icons/facebook.svg" alt="Facebook text as logo" />
						<span>
							Facebook helps you connect and share with the people in your life.
						</span>
					</div>
					<div className="login_2">
						<div className="login_2_wrap">
							<Formik
								initialValues={formValues}
								validationSchema={loginValidation}
								onSubmit={(values) => {
									onSubmit(values);
								}}>
								{(formik) => (
									<Form>
										<LoginInput
											type="text"
											name="email"
											placeholder="Email address or Phone number"
											onChange={(e) => {
												formik.handleChange(e);
												handleFormValues(e);
											}}
											value={formValues.email}
										/>
										<LoginInput
											type="password"
											name="password"
											placeholder="Password"
											onChange={(e) => {
												formik.handleChange(e);
												handleFormValues(e);
											}}
											value={formValues.password}
											bottom
										/>
										<button type="submit" className="blue_btn">
											Log In
										</button>
									</Form>
								)}
							</Formik>
							<Link to="/forgot" className="forgot_password">
								Forgotten password?
							</Link>
							<div className="sign_splitter"></div>
							<button className="blue_btn open_signup">Create Account</button>
						</div>
						<Link to="/" className="sign_extra">
							<b>Create a Page</b> for a celebrity, brand or business.
						</Link>
					</div>
				</div>
				<div className="register">
					<footer className="login_footer">
						<div className="login_footer_wrap">
							<Link to="/">English(UK)</Link>
							<Link to="/">Français(FR)</Link>
							<Link to="/">العربية</Link>
							<Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
							<Link to="/">Español (España)</Link>
							<Link to="/">italiano</Link>
							<Link to="/">Deutsch</Link>
							<Link to="/">Português (Brasil)</Link>
							<Link to="/">हिन्दी</Link>
							<Link to="/">中文(简体)</Link>
							<Link to="/">日本語</Link>
							<Link to="/" className="footer_square">
								<i className="plus_icon"></i>
							</Link>
						</div>
						<div className="footer_splitter"></div>
						<div className="login_footer_wrap">
							<Link to="/">Sign Up</Link>
							<Link to="/">Log in</Link>
							<Link to="/">Messenger</Link>
							<Link to="/">Facebook Lite</Link>
							<Link to="/">Watch</Link>
							<Link to="/">Places</Link>
							<Link to="/">Games</Link>
							<Link to="/">Marketplace</Link>
							<Link to="/">Facebook Pay</Link>
							<Link to="/">Oculus</Link>
							<Link to="/">Portal</Link>
							<Link to="/">Instagram</Link>
							<Link to="/">Bulletin</Link>
							<Link to="/">Local</Link>
							<Link to="/">Fundraisers</Link>
							<Link to="/">Services</Link>
							<Link to="/">Voting Information Centre</Link>
							<Link to="/">Groups</Link>
							<Link to="/">About</Link>
							<Link to="/">Create ad</Link>
							<Link to="/">Create Page</Link>
							<Link to="/">Developers</Link>
							<Link to="/">Careers</Link>
							<Link to="/">Privacy</Link>
							<Link to="/">Cookies</Link>
							<Link to="/">
								AdChoices
								<i className="adChoices_icon"></i>
							</Link>
							<Link to="/">Terms</Link>
							<Link to="/">Help</Link>
						</div>
						<div className="login_footer_wrap">
							<Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
								Meta © 2022
							</Link>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
};

export default Login;
