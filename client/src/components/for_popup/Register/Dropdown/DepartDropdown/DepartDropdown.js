// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = ({ getDepart, setDepart }) => {
	const [departDrop, setDepartDrop] = useState(false);

	const displayDepartment = () => {
		if (getDepart === "cse") {
			return "💻  CSE";
		} else if (getDepart === "eee") {
			return "💡  EEE";
		} else if (getDepart === "textile") {
			return "🕸️  TEXTILE";
		} else if (getDepart === "pharmacy") {
			return "💊   B.PHARMACY";
		} else if (getDepart === "bba") {
			return "📈   BBA";
		} else if (getDepart === "llb") {
			return "⚖️  LLB";
		} else if (getDepart === "english") {
			return "🔤   English";
		} else if (getDepart === "bangla") {
			return "অ   Bangla";
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
						<span>💻 &nbsp;CSE</span>
					</div>

					<div onClick={() => setDepart("eee")}>
						<span>💡 &nbsp;EEE</span>
					</div>

					<div onClick={() => setDepart("textile")}>
						<span>🕸️ &nbsp;TEXTILE</span>
					</div>

					<div onClick={() => setDepart("pharmacy")}>
						<span>💊&nbsp; PHARMACY</span>
					</div>

					<div onClick={() => setDepart("bba")}>
						<span>📈 &nbsp; BBA</span>
					</div>

					<div onClick={() => setDepart("llb")}>
						<span>⚖️&nbsp; LLB</span>
					</div>

					<div onClick={() => setDepart("english")}>
						<span>🔤 &nbsp; English</span>
					</div>

					<div onClick={() => setDepart("bangla")}>
						<span>অ &nbsp; Bangla</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepartDropdown;
