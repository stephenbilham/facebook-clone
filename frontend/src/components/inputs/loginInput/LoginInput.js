import "./styles.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const LoginInput = ({ placeholder, bottom, ...props }) => {
	const [field, meta] = useField(props);

	const error = meta.touched && meta.error;

	const desktopView = useMediaQuery({
		query: "(min-width: 850px)",
	});

	const errorMessage = (arrowPositionClass) => (
		<div className={`input_error ${desktopView ? "error_desktop" : ""}`}>
			<ErrorMessage name={field.name} />
			<div className={arrowPositionClass} />
		</div>
	);

	return (
		<div className={`input_wrap ${error ? "error" : ""}`}>
			{error &&
				!bottom &&
				errorMessage(desktopView ? "error_arrow_left" : "error_arrow_top")}
			<input
				type={field.type}
				name={field.name}
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
};

export default LoginInput;
