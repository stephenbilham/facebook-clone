import React from "react";
import Select from "react-dropdown-select";
import { useMediaQuery } from "react-responsive";

const DateOfBirthSelect = ({
	bDay,
	bMonth,
	bYear,
	days,
	months,
	years,
	handleRegisterChange,
	dateError,
}) => {
	const view2 = useMediaQuery({ query: "(min-width: 539px)" });

	const isError = Boolean(dateError);

	const errorClass = "input_error";
	const errorArrowClass = "error_arrow_bottom";
	const marginBottom =
		isError && !view2 ? "70px" : view2 && isError ? "60px" : "0px";

	const handleSelectChange = (name) => (values) => {
		handleRegisterChange({ target: { name, value: values[0].value } });
	};

	const formatOptions = (options) =>
		options.map((opt) => ({ label: opt, value: opt }));

	return (
		<div className="reg_grid" style={{ marginBottom }}>
			<Select
				options={formatOptions(days)}
				values={[{ label: bDay, value: bDay }]}
				onChange={handleSelectChange("bDay")}
				placeholder="Day"
				className="custom-select"
			/>
			<Select
				options={formatOptions(months)}
				values={[{ label: bMonth, value: bMonth }]}
				onChange={handleSelectChange("bMonth")}
				placeholder="Month"
				className="custom-select"
			/>
			<Select
				options={formatOptions(years)}
				values={[{ label: bYear, value: bYear }]}
				onChange={handleSelectChange("bYear")}
				placeholder="Year"
				className="custom-select"
			/>
			{isError && (
				<div className={errorClass}>
					<div className={errorArrowClass}></div>
					{dateError}
				</div>
			)}
		</div>
	);
};

export default DateOfBirthSelect;
