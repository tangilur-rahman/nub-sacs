// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./RoleDropdown.css";

const RoleDropdown = ({ getRole, setRole }) => {
	const [roleDrop, setRoleDrop] = useState(false);

	const displayRole = () => {
		if (getRole === "administrator") {
			return "🏫  Administrator";
		} else if (getRole === "advisor") {
			return "🤵  Advisor";
		} else if (getRole === "student") {
			return "👨‍🎓  Student";
		}
	};

	// for closing dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setRoleDrop(false);
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
				className={roleDrop ? "role-container active" : "role-container"}
				onClick={() => setRoleDrop(!roleDrop)}
			>
				<input
					type="text"
					placeholder="Select Role"
					readOnly
					value={displayRole()}
					required
				/>
				<div className="option" ref={myRef}>
					<div onClick={() => setRole("administrator")}>
						<span>🏫 &nbsp;Administrator</span>
					</div>
					<div onClick={() => setRole("advisor")}>
						<span>🤵 &nbsp;Advisor</span>
					</div>
					<div onClick={() => setRole("student")}>
						<span>👨‍🎓 &nbsp;Student</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoleDropdown;
