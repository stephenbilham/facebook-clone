import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput/RegisterInput";
import CustomSelect from "../customSelect/CustomDropdown";
import * as Yup from "yup";

const userInfos = {
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	bYear: new Date().getFullYear(),
	bMonth: new Date().getMonth() + 1,
	bDay: new Date().getDate(),
	gender: "",
};

const RegisterForm = () => {
	const [user, setUser] = useState(userInfos);

	const { bYear, bMonth, bDay } = user;

	const handleRegisterChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const getDays = () => {
		return new Date(bYear, bMonth, 0).getDate();
	};

	const tempYear = new Date().getFullYear();
	const years = Array.from(new Array(108), (__, index) => tempYear - index);
	const months = Array.from(new Array(12), (__, index) => index + 1);
	const days = [...Array(getDays())].map((__, index) => index + 1);

	const registerValidation = Yup.object({
		first_name: Yup.string()
			.required("First name is required.")
			.min(2, "First name must be between 2-16 characters.")
			.max(16, "First name must be between 2-16 characters.")
			.matches(/^[aA-zZ]+$/, "Numbers and special characters not allowed."),
		last_name: Yup.string()
			.required("Last name is required.")
			.min(2, "Last name must be between 2-16 characters.")
			.max(16, "Last name must be between 2-16 characters."),
		email: Yup.string()
			.required("You'll need this to login or to reset your password.")
			.email("Enter a valid email address."),
		password: Yup.string()
			.required(
				"Enter a combination of at least 6 numbers, letters, and punctuation marks (such as ! and &)."
			)
			.min(6, "Password must be at least 6 characters.")
			.max(36, "Password cannot be more than 36 characters."),
	});

	return (
		<div className="blur">
			<div className="register">
				<div className="register_header">
					<i className="exit_icon"></i>
					<span>Sign Up</span>
					<span>it's quick and easy</span>
				</div>
				<Formik
					initialValues={user}
					enableReinitialize
					validationSchema={registerValidation}>
					<Form className="register_form">
						<div className="reg_line">
							<RegisterInput
								type="text"
								placeholder="First name"
								name="first_name"
								onChange={handleRegisterChange}
							/>
							<RegisterInput
								type="text"
								placeholder="Last Name"
								name="last_name"
								onChange={handleRegisterChange}
							/>
						</div>
						<div className="reg_line">
							<RegisterInput
								type="text"
								placeholder="Mobile number or email address"
								name="email"
								onChange={handleRegisterChange}
							/>
						</div>
						<div className="reg_line">
							<RegisterInput
								type="password"
								placeholder="New password"
								name="password"
								onChange={handleRegisterChange}
							/>
						</div>
						<div className="reg_col">
							<div className="reg_line_header">
								Date of birth <i className="info_icon"></i>
							</div>
							<div className="reg_grid">
								<CustomSelect
									name="bDay"
									options={days}
									value={bDay}
									onChange={handleRegisterChange}
								/>
								<CustomSelect
									name="bMonth"
									options={months}
									value={bMonth}
									onChange={handleRegisterChange}
								/>
								<CustomSelect
									name="bYear"
									options={years}
									value={bYear}
									onChange={handleRegisterChange}
								/>
							</div>
						</div>
						<div className="reg_col">
							<div className="reg_line_header">
								Gender <i className="info_icon"></i>
							</div>
							<div className="reg_grid">
								<label htmlFor="male">
									Male
									<input
										type="radio"
										name="gender"
										id="male"
										value="male"
										onChange={handleRegisterChange}
									/>
								</label>
								<label htmlFor="female">
									Female
									<input
										type="radio"
										name="gender"
										id="female"
										value="female"
										onChange={handleRegisterChange}
									/>
								</label>
								<label htmlFor="custom">
									Custom
									<input
										type="radio"
										name="gender"
										id="custom"
										value="custom"
										onChange={handleRegisterChange}
									/>
								</label>
							</div>
						</div>
						<div className="reg_infos">
							By clicking Sign Up, you agree to our{" "}
							<span>Terms, Data Policy &nbsp;</span>
							and <span>Cookie Policy.</span> You may receive SMS notifications
							from us and can opt out at any time.
						</div>
						<div className="reg_btn_wrapper">
							<button className="blue_btn open_signup">Sign Up</button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default RegisterForm;
