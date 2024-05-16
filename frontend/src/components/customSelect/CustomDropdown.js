import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const CustomSelect = ({ options, value, onChange, name }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSelect = (option) => {
		onChange({ target: { name, value: option } });
		setIsOpen(false);
	};

	return (
		<div className="custom-select" ref={dropdownRef}>
			<div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
				{value}
			</div>
			{isOpen && (
				<div className="custom-select-options">
					{options.map((option) => (
						<div
							key={option}
							className="custom-select-option"
							onClick={() => handleSelect(option)}>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
