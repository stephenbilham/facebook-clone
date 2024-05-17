import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const LoginInput = ({ placeholder, bottom, ...props }) => {
	const [field, meta] = useField(props);
	const desktopView = useMediaQuery({ query: "(min-width: 850px)" });
	const isError = meta.touched && meta.error;

	const getErrorArrowClass = () => {
		if (desktopView) {
			return "error_arrow_left";
		}
		return bottom ? "error_arrow_bottom" : "error_arrow_top";
	};

	return (
		<div className="input_wrap">
			{isError && !bottom && (
				<div
					className={`input_error ${desktopView ? "input_error_desktop" : ""}`}
					style={{ transform: "translateY(3px)" }}>
					<ErrorMessage name={field.name} />
					<div className={getErrorArrowClass()}></div>
				</div>
			)}
			<input
				className={isError ? "input_error_border" : ""}
				type={field.type}
				name={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{isError && bottom && (
				<div
					className={`input_error ${desktopView ? "input_error_desktop" : ""}`}
					style={{ transform: "translateY(2px)" }}>
					<ErrorMessage name={field.name} />
					<div className={getErrorArrowClass()}></div>
				</div>
			)}
			{isError && (
				<i
					className="error_icon"
					style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}></i>
			)}
		</div>
	);
};

export default LoginInput;
