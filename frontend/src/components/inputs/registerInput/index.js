import "./style.css";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const RegisterInput = ({ placeholder, ...props }) => {
	const [field, meta] = useField(props);
	const view1 = useMediaQuery({ query: "(min-width: 539px)" });
	const view3 = useMediaQuery({ query: "(min-width: 1170px)" });

	const isError = meta.touched && meta.error;
	const isFirstNameOrLastName =
		field.name === "first_name" || field.name === "last_name";
	const isEmailOrPassword = field.name === "email" || field.name === "password";
	const errorPositionLeft = view3 && field.name === "first_name";
	const errorPositionRight = view3 && field.name === "last_name";

	const getInputWidth = () => {
		if (view1) {
			if (isFirstNameOrLastName) return "100%";
			if (isEmailOrPassword) return "370px";
		}
		return "300px";
	};

	return (
		<div className="input_wrap register_input_wrap">
			<input
				className={isError ? "input_error_border" : ""}
				style={{ width: getInputWidth() }}
				type={field.type}
				name={field.name}
				placeholder={placeholder}
				{...field}
				{...props}
			/>
			{isError && (
				<div
					className={`input_error ${view3 ? "input_error_desktop" : ""}`}
					style={{
						transform: "translateY(2px)",
						left: errorPositionLeft
							? "-107%"
							: errorPositionRight
							? "107%"
							: "",
					}}>
					<ErrorMessage name={field.name} />
					<div
						className={
							view3
								? field.name === "last_name"
									? "error_arrow_right"
									: "error_arrow_left"
								: "error_arrow_bottom"
						}></div>
				</div>
			)}
			{isError && <i className="error_icon"></i>}
		</div>
	);
};

export default RegisterInput;
