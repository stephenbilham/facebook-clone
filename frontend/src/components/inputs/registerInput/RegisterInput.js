import React from "react";
import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function RegisterInput({ placeholder, bottom, ...props }) {
	const [field, meta] = useField(props);

	const error = meta.touched && meta.error;

	const desktopView = useMediaQuery({
		query: "(min-width: 850px)",
	});

	const errorMessage = (arrowPositionClass) => (
		<div className={`input_error ${desktopView ? "input_error_desktop" : ""}`}>
			<ErrorMessage name={field.name} />
			<div className={arrowPositionClass}></div>
		</div>
	);

	return (
		<div className={`input_wrap ${error ? "error" : ""}`}>
			{error &&
				!bottom &&
				errorMessage(desktopView ? "error_arrow_left" : "error_arrow_top")}
			<input
				className={meta.touched && meta.error ? "input_error_border" : ""}
				type={field.type}
				name={field.name}
				autoComplete={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{error &&
				bottom &&
				errorMessage(desktopView ? "error_arrow_left" : "error_arrow_bottom")}
			{error && (
				<i
					className="error_icon"
					style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
				/>
			)}
		</div>
	);
}
