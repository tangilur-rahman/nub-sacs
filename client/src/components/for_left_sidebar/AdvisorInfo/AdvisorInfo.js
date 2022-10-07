// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "./../../../ContextApi";
import "./AdvisorInfo.css";

const AdvisorInfo = () => {
	// for get currentUser
	const { currentUser } = GetContextApi();

	// for checking loading complete or not
	const [isLoading, setIsLoading] = useState(true);

	// get my advisor
	const [getAdvisor, setAdvisor] = useState("");

	const getMyAdvisor = async () => {
		try {
			const response = await fetch("/my-advisor");

			const result = await response.json();

			if (response.status === 200) {
				setAdvisor(result);
				setIsLoading(false);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} catch (error) {
			toast.error(
				"Your advisor account didn't found. Please contact our office.",
				{
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				}
			);
		}
	};

	useEffect(() => {
		if (currentUser.role === "student") {
			getMyAdvisor();
		}
	}, [currentUser]);

	// for detect office-hour for advisor's active-status start
	function isWorkingHour(now) {
		if (now.getDay() >= 5 && now.getHours() >= 9 && now.getHours() <= 22) {
			return true;
		} else if (
			now.getDay() <= 4 &&
			now.getHours() >= 9 &&
			now.getHours() <= 17
		) {
			return true;
		} else {
			return false;
		}
	}

	const officeHour = isWorkingHour(new Date(Date.now()));
	// for detect office-hour for advisor's active-status end

	return (
		<>
			{isLoading ? (
				<div className="loading-animation">
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
				</div>
			) : (
				<>
					{getAdvisor ? (
						<div className="advisor-info-container">
							<div className="row m-0 layout">
								<div className="col-12 p-0">
									<div className="wrapper">
										<div className="advisor-profile">
											<span className="img-wrapper">
												<img
													src={`uploads/profile-img/${getAdvisor?.profile_img}`}
													alt="profile-img"
													className="img-fluid animation"
												/>
											</span>
										</div>
										<div className="advisor-info">
											<div className="row info m-0">
												<span id="name">
													Name : <input value={getAdvisor?.name} readOnly />
												</span>
												<span>
													ID :
													<input
														value={getAdvisor?.id}
														readOnly
														style={{ "max-width": "170px" }}
													/>
												</span>
												<span id="email">
													Email : <input value={getAdvisor?.email} readOnly />
												</span>
												<span id="phone-number">
													Phone :
													{getAdvisor.phone ? (
														<div style={{ display: "inline-block" }}>
															<h6>+880</h6>
															<input readOnly value={getAdvisor?.phone} />
														</div>
													) : (
														<div
															style={{
																fontWeight: "600",
																color: " #006d77",
																display: "inline-block"
															}}
														>
															&nbsp;&nbsp;Null
														</div>
													)}
												</span>
												<span>
													Gender :
													<input
														value={getAdvisor?.gender}
														readOnly
														style={{ "max-width": "170px" }}
													/>
												</span>
												<span>
													Department :
													<input
														value={getAdvisor?.department}
														readOnly
														id="department"
													/>
												</span>

												<span id="active-status">
													Active Status:{officeHour && <div></div>}
													<input
														value={
															officeHour ? getAdvisor.active_status : "Closed"
														}
														readOnly
														id="display"
													/>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div id="not-found-advisor">
							Your advisor account didn't found. Please contact our office.
						</div>
					)}
				</>
			)}
		</>
	);
};

export default AdvisorInfo;
