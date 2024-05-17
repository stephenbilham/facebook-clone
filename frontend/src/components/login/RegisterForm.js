import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import RegisterInput from "../inputs/registerInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";

const RegisterForm = () => {
	const initialValues = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		bYear: new Date().getFullYear(),
		bMonth: new Date().getMonth() + 1,
		bDay: new Date().getDate(),
		gender: "",
	};

	const [formState, setFormState] = useState({
		user: initialValues,
		dateError: "",
		genderError: "",
		error: false,
		success: false,
		loading: false,
	});

	const { user, dateError, genderError, error, success, loading } = formState;

	const handleRegisterChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			user: {
				...prevState.user,
				[name]: value,
			},
		}));
	};

	const registerSubmit = async (userData) => {
		try {
			setFormState((prevState) => ({ ...prevState, loading: true }));
			await axios.post("http://localhost:8000/register", userData);
			setFormState((prevState) => ({
				...prevState,
				loading: false,
				error: false,
				success: true,
			}));
		} catch (error) {
			console.error("Error submitting form:", error);
			setFormState((prevState) => ({
				...prevState,
				loading: false,
				success: false,
				error: true,
			}));
		}
	};

	const years = Array.from(
		new Array(108),
		(val, index) => new Date().getFullYear() - index
	);
	const months = Array.from(new Array(12), (val, index) => index + 1);
	const getDays = () => new Date(user.bYear, user.bMonth, 0).getDate();
	const days = Array.from(new Array(getDays()), (val, index) => index + 1);

	const registerValidation = Yup.object({
		first_name: Yup.string()
			.required("First name is required.")
			.min(2, "First name must be between 2 and 16 characters.")
			.max(16, "First name must be between 2 and 16 characters.")
			.matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
		last_name: Yup.string()
			.required("Last name is required.")
			.min(2, "Last name must be between 2 and 16 characters.")
			.max(16, "Last name must be between 2 and 16 characters.")
			.matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
		email: Yup.string()
			.required(
				"You'll need this when you log in and if you ever need to reset your password."
			)
			.email("Enter a valid email address."),
		password: Yup.string()
			.required(
				"Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &)."
			)
			.min(6, "Password must be at least 6 characters.")
			.max(36, "Password can't be more than 36 characters."),
	});

	const handleSubmit = async (values) => {
		const current_date = new Date();
		const picked_date = new Date(values.bYear, values.bMonth - 1, values.bDay);

		// Calculate the age difference
		const age = current_date.getFullYear() - picked_date.getFullYear();
		const isUnderMinAge =
			age < 14 ||
			(age === 14 &&
				current_date <
					new Date(
						current_date.getFullYear(),
						picked_date.getMonth(),
						picked_date.getDate()
					));
		const isOverMaxAge =
			age > 70 ||
			(age === 70 &&
				current_date >
					new Date(
						current_date.getFullYear(),
						picked_date.getMonth(),
						picked_date.getDate()
					));

		if (isUnderMinAge) {
			setFormState((prevState) => ({
				...prevState,
				dateError: "You need to be over 14 to fall within our age guidelines.",
			}));
		} else if (isOverMaxAge) {
			setFormState((prevState) => ({
				...prevState,
				dateError: "You need to be under 70 to fall within our age guidelines.",
			}));
		} else if (values.gender === "") {
			setFormState((prevState) => ({
				...prevState,
				dateError: "",
				genderError:
					"Please choose a gender. You can change who can see this later.",
			}));
		} else {
			setFormState((prevState) => ({
				...prevState,
				dateError: "",
				genderError: "",
			}));
			await registerSubmit(values);
		}
	};

	return (
		<div className="blur">
			<div className="register">
				<div className="register_header">
					<i className="exit_icon"></i>
					<span>Sign Up</span>
					<span>it's quick and easy</span>
				</div>
				<Formik
					enableReinitialize
					initialValues={user}
					validationSchema={registerValidation}
					onSubmit={handleSubmit}>
					{() => (
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
									placeholder="Surname"
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
								<DateOfBirthSelect
									bDay={user.bDay}
									bMonth={user.bMonth}
									bYear={user.bYear}
									days={days}
									months={months}
									years={years}
									handleRegisterChange={handleRegisterChange}
									dateError={dateError}
								/>
							</div>
							<div className="reg_col">
								<div className="reg_line_header">
									Gender <i className="info_icon"></i>
								</div>
								<GenderSelect
									handleRegisterChange={handleRegisterChange}
									genderError={genderError}
								/>
							</div>
							<div className="reg_infos">
								By clicking Sign Up, you agree to our{" "}
								<span>Terms, Data Policy &nbsp;</span>
								and <span>Cookie Policy.</span> You may receive SMS
								notifications from us and can opt out at any time.
							</div>
							<div className="reg_btn_wrapper">
								<button className="blue_btn open_signup" type="submit">
									Sign Up
								</button>
							</div>
							<DotLoader color="#1876f2" loading={loading} size={30} />
							{error && <div className="error_text">You have an error!</div>}
							{success && <div className="success_text">Success!</div>}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RegisterForm;
