import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../inputs/loginInput/LoginInput";

const LoginForm = () => {
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
						enableReinitialize
						validationSchema={loginValidation}
						onSubmit={(values) => onSubmit(values)}>
						<Form style={{ width: "100%" }}>
							<LoginInput
								type="text"
								name="email"
								placeholder="Email address or Phone number"
								onChange={handleFormValues}
							/>
							<LoginInput
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleFormValues}
								bottom
							/>
							<button type="submit" className="blue_btn">
								Log In
							</button>
						</Form>
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
	);
};

export default LoginForm;
