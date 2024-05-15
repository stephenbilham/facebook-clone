import "./styles.css";
import { useField, ErrorMessage } from "formik";

const LoginInput = ({ placeholder, bottom, ...props }) => {
	const [field, meta] = useField(props);

	const error = meta.touched && meta.error;

	return (
		<div className={`input_wrap ${error ? "error" : ""}`}>
			{error && !bottom && (
				<div className="input_error" style={{ transform: "translateY(3px)" }}>
					{error && <ErrorMessage name={field.name} />}
					{error && <div className="error_arrow_top"></div>}
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
				<div className="input_error" style={{ transform: "translateY(2px)" }}>
					{error && <ErrorMessage name={field.name} />}
					{error && <div className="error_arrow_bottom"></div>}
				</div>
			)}

			{error && (
				<i className="error_icon" style={{ top: `${!bottom && "63%"}` }}></i>
			)}
		</div>
	);
};

export default LoginInput;
