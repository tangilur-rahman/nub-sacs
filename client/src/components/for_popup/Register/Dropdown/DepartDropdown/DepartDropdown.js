// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = ({ getDepart, setDepart }) => {
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
			<div
				className={departDrop ? "depart-container active" : "depart-container"}
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
						<span>π» &nbsp;CSE</span>
					</div>

					<div onClick={() => setDepart("eee")}>
						<span>π‘ &nbsp;EEE</span>
					</div>

					<div onClick={() => setDepart("textile")}>
						<span>πΈοΈ &nbsp;TEXTILE</span>
					</div>

					<div onClick={() => setDepart("pharmacy")}>
						<span>π&nbsp; PHARMACY</span>
					</div>

					<div onClick={() => setDepart("bba")}>
						<span>π &nbsp; BBA</span>
					</div>

					<div onClick={() => setDepart("llb")}>
						<span>βοΈ&nbsp; LLB</span>
					</div>

					<div onClick={() => setDepart("english")}>
						<span>π€ &nbsp; English</span>
					</div>

					<div onClick={() => setDepart("bangla")}>
						<span>ΰ¦ &nbsp; Bangla</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepartDropdown;
