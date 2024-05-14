import React from "react";
import "./styles.css";

const Login = () => {
	return (
		<div className="fb-login-container">
			<div className="fb-login-content">
				<div className="login-box">
					<h2>Facebook</h2>
					<form>
						<div className="input-group">
							<label>Email or Phone Number</label>
							<input type="text" placeholder="Email or Phone Number" />
						</div>
						<div className="input-group">
							<label>Password</label>
							<input type="password" placeholder="Password" />
						</div>
						<button type="submit" className="login-btn">
							Log In
						</button>
						<div className="options">
							<div className="remember-me">
								<input type="checkbox" id="remember" />
								<label htmlFor="remember">Remember me</label>
							</div>
							<a href="#" className="forgot-password">
								Forgot Password?
							</a>
						</div>
						<hr />
						<div className="create-account">
							<a href="#">Create New Account</a>
						</div>
					</form>
				</div>
			</div>
			<div className="fb-login-sidebar">
				{/* Right Sidebar Content Goes Here */}
				<div className="sidebar-content">
					<h3>Connect with friends and the world around you on Facebook.</h3>
					<div>
						<h4>News Feed</h4>
						<p>See photos and updates from friends.</p>
					</div>
					<div>
						<h4>Timeline</h4>
						<p>Share what's new in your life.</p>
					</div>
					<div>
						<h4>Facebook Search</h4>
						<p>Find more of what you're looking for.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
