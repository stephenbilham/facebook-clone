import "./styles.css";
import React from "react";
import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
import RegisterForm from "../../components/login/RegisterForm";

const Login = () => {
	return (
		<div className="login">
			<div className="login_wrapper">
				<LoginForm />
			</div>
			<div className="register">
				<RegisterForm />
			</div>
			<Footer />
		</div>
	);
};

export default Login;
