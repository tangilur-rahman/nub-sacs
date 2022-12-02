// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./SemesterDropdown.css";

const SemesterDropDown = ({ getSemester, setSemester, editT }) => {
	const [semesterDrop, setSemesterDrop] = useState(false);

	// for closing dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setSemesterDrop(false);
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
					value={getSemester}
					style={{ textAlign: "start", maxWidth: "190px" }}
					readOnly
				/>
			) : (
				<div
					className={
						semesterDrop ? "semester-container active" : "semester-container"
					}
					onClick={() => setSemesterDrop(!semesterDrop)}
				>
					<input
						type="text"
						placeholder="Select Semester"
						readOnly
						value={getSemester}
						required
					/>
					<div className="option" ref={myRef}>
						<div onClick={() => setSemester("1st")}>
							<div>1st</div>
						</div>
						<div onClick={() => setSemester("2nd")}>
							<div>2nd</div>
						</div>

						<div onClick={() => setSemester("3rd")}>
							<div>3rd</div>
						</div>

						<div onClick={() => setSemester("4th")}>
							<div>4th</div>
						</div>

						<div onClick={() => setSemester("5th")}>
							<div>5th</div>
						</div>

						<div onClick={() => setSemester("6th")}>
							<div>6th</div>
						</div>

						<div onClick={() => setSemester("7th")}>
							<div>7th</div>
						</div>

						<div onClick={() => setSemester("8th")}>
							<div>8th</div>
						</div>

						<div onClick={() => setSemester("9th")}>
							<div>9th</div>
						</div>

						<div onClick={() => setSemester("10th")}>
							<div>10th</div>
						</div>

						<div onClick={() => setSemester("11th")}>
							<div>11th</div>
						</div>

						<div onClick={() => setSemester("12th")}>
							<div>12th</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SemesterDropDown;
