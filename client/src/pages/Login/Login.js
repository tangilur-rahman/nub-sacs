// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal components
import "./Login.css";

const Login = () => {
	// summary toggle
	const [summaryT, setSummaryT] = useState("auth");

	// For redirect "/dashboard"
	const Navigate = useNavigate();

	// for toggle password type
	const [typeT, setTypeT] = useState(false);

	const [user, setUser] = useState({
		id_or_email: "",
		password: ""
	});

	const { id_or_email, password } = user;

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		if (name === "email") {
			setUser({ id_or_email: value, password });
		} else {
			setUser({ id_or_email, password: value });
		}
	};

	const submitHandler = async () => {
		const userObject = {
			id_or_email,
			password
		};

		try {
			const response = await fetch("/login", {
				method: "POST",
				body: JSON.stringify(userObject),
				headers: { "Content-Type": "application/json" }
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});
				setTimeout(() => {
					return Navigate("/dashboard");
				}, 3000);

				// for clear fields
				setUser({
					id_or_email: "",
					password: ""
				});
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
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
		}
	};

	// when press enter key submit start
	const onKeyDown = (event) => {
		if (event.key === "Enter") {
			submitHandler();
		} else {
			return;
		}
	};
	// when press enter key submit end

	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0 login-container">
					<div className="col-xl-9 col-lg-10 col-md-8 col-sm-10 col-11 p-0 form-container-wrapper">
						<div className="row m-0 form-container">
							<div className="col-lg-6 d-none d-lg-flex left p-0">
								<img
									src="/assets/images/login-img.png"
									alt="nsu-img"
									className="img-fluid"
								/>
							</div>
							<div className="col-lg-6 right p-0">
								<img
									src="/assets/images/login-logo.png"
									alt="university-logo"
									className="img-fluid"
								/>
								<form>
									<div className="form-floating mb-4">
										<input
											type="email"
											className="form-control"
											id="email"
											name="email"
											value={id_or_email}
											placeholder="Email or ID"
											onChange={onChangeHandler}
										/>
										<label htmlFor="email">Email or ID :</label>
									</div>
									<div className="form-floating" id="password-field">
										<input
											type={typeT ? "text" : "password"}
											className="form-control"
											id="password"
											name="password"
											value={password}
											placeholder="Password"
											onChange={onChangeHandler}
											onKeyDown={onKeyDown}
										/>
										<label htmlFor="password">Password :</label>

										{/* password field eye toggle start  */}
										{password && (
											<span id="eye">
												{typeT ? (
													<i
														className="fa-solid fa-eye"
														onClick={() => setTypeT(!typeT)}
														style={{ color: "#6930c3" }}
													></i>
												) : (
													<i
														className="fa-solid fa-eye-slash"
														onClick={() => setTypeT(!typeT)}
													></i>
												)}
											</span>
										)}
										{/* password field eye toggle end  */}
									</div>

									<button
										type="button"
										className="btn btn-success mt-4"
										onClick={submitHandler}
									>
										Log In
									</button>
								</form>
							</div>
						</div>
					</div>

					{/* <div className="row m-0 project-summary-container">
						<div className="col-10 p-0 project-summary">
							<div className="tab-container">
								<h6
									onClick={() => setSummaryT("auth")}
									className="hover-link"
									id={summaryT === "auth" ? "underline" : ""}
								>
									Authentication
								</h6>
								<h6
									onClick={() => setSummaryT("summary")}
									className="hover-link"
									id={summaryT === "summary" ? "underline" : ""}
								>
									Summary
								</h6>
							</div>

							<table>
								<tr>
									<td>Administrator: </td>
									{summaryT === "auth" ? (
										<td>
											<span>Email:</span> admin@gmail.com <span>Id:</span> 10
											<span>Password:</span> 12345678
										</td>
									) : (
										<td className="details">
											Administrator can CRUD operation with all advisors &
											students accounts, see all students's appointment details,
											real-time group chatting & get notifications and more.
										</td>
									)}
								</tr>

								<tr>
									<td>Advisor:</td>
									{summaryT === "auth" ? (
										<td>
											<span>Email:</span> advisor@gmail.com <span>Id:</span> 100
											<span>Password:</span> 12345678
										</td>
									) : (
										<td className="details">
											Advisor can see specific students all appointments, pick
											appointment date & changes appointments status & reply,
											chatting with specific students in group or personally,
											get notifications, send any types of documents, modify
											profile and more.
										</td>
									)}
								</tr>

								<tr>
									<td>Student:</td>
									{summaryT === "auth" ? (
										<td>
											<span>Email:</span> student@gmail.com <span>Id:</span> 200
											<span>Password:</span> 12345678
										</td>
									) : (
										<td className="details">
											Student can create multiple appointments, chatting his/her
											advisor, department wise group chat, get notifications,
											send any types of documents, modify profile and more.
										</td>
									)}
								</tr>
							</table>
						</div>
					</div> */}
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default Login;
