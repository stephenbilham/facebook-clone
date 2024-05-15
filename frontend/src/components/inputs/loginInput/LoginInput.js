import "./styles.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const LoginInput = ({ placeholder, bottom, ...props }) => {
	const [field, meta] = useField(props);

	const error = meta.touched && meta.error;

	const desktopView = useMediaQuery({
		query: "(min-width: 850px)",
	});

	return (
		<div className={`input_wrap ${error ? "error" : ""}`}>
			{error && !bottom && (
				<div className={`input_error ${desktopView ? "error_desktop" : ""}`}>
					{error && <ErrorMessage name={field.name} />}
					{error && (
						<div
							className={`${
								desktopView ? "error_arrow_left" : "error_arrow_top"
							}`}></div>
					)}
				</div>
			)}
			<input
				type={field.type}
				name={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{error && bottom && (
				<div className={`input_error ${desktopView ? "error_desktop" : ""}`}>
					{error && <ErrorMessage name={field.name} />}
					{error && (
						<div
							className={`${
								desktopView ? "error_arrow_left" : "error_arrow_bottom"
							}`}></div>
					)}
				</div>
			)}
			{error && (
				<i
					className="error_icon"
					style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}></i>
			)}
		</div>
	);
};

export default LoginInput;
