import React from "react";
import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const RegisterInput = ({ placeholder, bottom, ...props }) => {
	const [field, meta] = useField(props);

	const error = meta.touched && meta.error;
	const valid = field.value && !meta.error;

	const desktopView = useMediaQuery({
		query: "(min-width: 850px)",
	});

	const errorMessage = () => (
		<div className={`input_error `}>
			<div className="error_arrow_bottom" />
			<ErrorMessage name={field.name} />
		</div>
	);

	return (
		<div
			className={`input_wrap register_input_wrap ${
				valid ? "valid_input_bg" : ""
			} ${error ? "error" : ""}`}>
			<input
				className={meta.touched && meta.error ? "input_error_border" : ""}
				type={field.type}
				name={field.name}
				autoComplete={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{error && errorMessage()}
			{error && (
				<i
					className="error_icon"
					style={{ top: `${!desktopView ? "63%" : "15px"}` }}
				/>
			)}
		</div>
	);
};

export default RegisterInput;
