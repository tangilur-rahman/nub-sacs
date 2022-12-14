// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = ({ getDepart, setDepart, editT }) => {
	const [departDrop, setDepartDrop] = useState(false);

	const displayDepartment = () => {
		if (getDepart === "cse") {
			return "π»  CSE";
		} else if (getDepart === "eee") {
			return "π‘  EEE";
		} else if (getDepart === "textile") {
			return "πΈοΈ  TEXTILE";
		} else if (getDepart === "pharmacy") {
			return "π   B.PHARMACY";
		} else if (getDepart === "bba") {
			return "π   BBA";
		} else if (getDepart === "llb") {
			return "βοΈ  LLB";
		} else if (getDepart === "english") {
			return "π€   English";
		} else if (getDepart === "bangla") {
			return "ΰ¦   Bangla";
		}
	};

	// for closing dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setDepartDrop(false);
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
					value={getDepart.toUpperCase()}
					style={{ textAlign: "start" }}
					readOnly
				/>
			) : (
				<div
					className={
						departDrop ? "depart-container active" : "depart-container"
					}
					onClick={() => setDepartDrop(!departDrop)}
				>
					<input
						type="text"
						placeholder="Select Department"
						readOnly
						value={displayDepartment()}
						required
					/>
					<div className="option" ref={myRef}>
						<div onClick={() => setDepart("cse")}>
							<div>π» &nbsp;CSE</div>
						</div>

						<div onClick={() => setDepart("eee")}>
							<div>π‘ &nbsp;EEE</div>
						</div>

						<div onClick={() => setDepart("textile")}>
							<div>πΈοΈ &nbsp;TEXTILE</div>
						</div>

						<div onClick={() => setDepart("pharmacy")}>
							<div>π &nbsp; B.PHARMACY</div>
						</div>

						<div onClick={() => setDepart("bba")}>
							<div>π &nbsp; BBA</div>
						</div>

						<div onClick={() => setDepart("llb")}>
							<div>βοΈ&nbsp; LLB</div>
						</div>

						<div onClick={() => setDepart("english")}>
							<div>π€ &nbsp; English</div>
						</div>

						<div onClick={() => setDepart("bangla")}>
							<div>ΰ¦ &nbsp; Bangla</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DepartDropdown;
