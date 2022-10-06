// external components
import { useState } from "react";

// internal components
import "./ActiveStatus.css";

const ActiveStatus = ({ getActiveS, setActiveS }) => {
	const [activeDrop, setActiveDrop] = useState(false);

	const displayingStatus = () => {
		if (getActiveS === "Available now on desk") {
			return "💻  Available now on desk";
		} else if (getActiveS === "Leave for class") {
			return "👨‍🏫  Leave for class";
		} else if (getActiveS === "Leave for prayer") {
			return "🤲  Leave for prayer";
		} else if (getActiveS === "Leave for lunch") {
			return "🍕  Leave for lunch";
		} else if (getActiveS === "Tea break") {
			return "☕  Tea break";
		}
	};

	return (
		<>
			<div
				className={activeDrop ? "status-container active" : "status-container"}
				onClick={() => setActiveDrop(!activeDrop)}
			>
				<input
					type="text"
					placeholder="Active Status"
					readOnly
					value={displayingStatus()}
					required
				/>
				<div className="option">
					<div onClick={() => setActiveS("Available now on desk")}>
						<div>💻 &nbsp; Available now on desk</div>
					</div>
					<div onClick={() => setActiveS("Leave for class")}>
						<div>👨‍🏫 &nbsp; Leave for class</div>
					</div>
					<div onClick={() => setActiveS("Leave for prayer")}>
						<div>🤲 &nbsp; Leave for prayer</div>
					</div>

					<div onClick={() => setActiveS("Leave for lunch")}>
						<div>🍕 &nbsp; Leave for lunch</div>
					</div>

					<div onClick={() => setActiveS("Tea break")}>
						<div>☕ &nbsp; Tea break</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ActiveStatus;
