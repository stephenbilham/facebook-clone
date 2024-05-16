import React from "react";
import "./styles.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const LoginInput = ({ placeholder, bottom, ...props }) => {
	const [field, meta] = useField(props);

	const error = meta.touched && meta.error;

	const desktopView = useMediaQuery({
		query: "(min-width: 850px)",
	});

	const errorMessage = () => (
		<div className="input_error">
			<ErrorMessage name={field.name} />
			<div className="error_arrow_bottom" />
		</div>
	);

	return (
		<div className={`input_wrap ${error ? "error" : ""}`}>
			<input
				type={field.type}
				name={field.name}
				autoComplete={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{error && errorMessage()}
			{error && <i className="error_icon" style={{ top: "15px" }} />}
		</div>
	);
};

export default LoginInput;
