// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./GenderDropdown.css";

const GenderDropdown = ({ getGender, setGender, editT }) => {
	const [genderDrop, setGenderDrop] = useState(false);

	const displayGender = () => {
		if (getGender === "male") {
			return "👱‍♂️  Male";
		} else if (getGender === "female") {
			return "👩  Female";
		} else if (getGender === "other") {
			return "⚨  Other";
		}
	};

	// for closing dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setGenderDrop(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// for closing dropdown when outside clicked start

	return (
		<>
			{!editT ? (
				<input
					value={displayGender()}
					style={{ textAlign: "start", maxWidth: "160px" }}
					readOnly
				/>
			) : (
				<div
					className={
						genderDrop ? "gender-container active" : "gender-container"
					}
					onClick={() => setGenderDrop(!genderDrop)}
				>
					<input
						type="text"
						placeholder="Select Gender"
						readOnly
						value={displayGender()}
						required
					/>
					<div className="option" ref={myRef}>
						<div onClick={() => setGender("male")}>
							<div>👱‍♂️ &nbsp; Male</div>
						</div>
						<div onClick={() => setGender("female")}>
							<div>👩 &nbsp; Female</div>
						</div>

						<div onClick={() => setGender("other")}>
							<div>&nbsp; ⚨ &nbsp; Other</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default GenderDropdown;
