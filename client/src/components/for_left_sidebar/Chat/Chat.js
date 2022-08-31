// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import ChatBoxSkeleton from "../../Skeleton/ChatBoxSkeleton/ChatBoxSkeleton";
import "./Chat.css";
import MessageBox from "./MessageBox/MessageBox";
import UserBox from "./UserBox/UserBox";
import { Viewport } from "./Viewport";

const Chat = ({ messageId }) => {
	// for get current user
	const { currentUser, setHideMenu } = GetContextApi();

	// for user-box & message-box toggle
	const [chatT, setChatT] = useState(false);
	const isMobile = Viewport("(max-width:768px)", true);

	// check fetching complete or not from server
	const [isLoading, setIsLoading] = useState(true);

	// for get messages for display in chat-box
	const [getMessages, setMessages] = useState("");

	// get latest message & time
	const [latestGroup, setLatestGroup] = useState("");
	const [latestPersonal, setLatestPersonal] = useState("");

	// for get search input field value & applied
	const [search, setSearch] = useState("");
	const [searchUser, setSearchUser] = useState("");
	const [selectedSearch, setSelectedSearch] = useState("");

	// for get or create group-chat start
	const [getGroup, setGroup] = useState("");
	const [getGroupArray, setGroupArray] = useState("");

	// for refetching group again when group edit
	const [reloadGroup, setReloadGroup] = useState("");

	const getGroupChat = async () => {
		try {
			const response = await fetch("/group-chat");

			const result = await response.json();

			if (response.status === 200) {
				if (currentUser.role === "administrator") {
					setGroupArray(result ? result : "");
				} else {
					setGroup(result ? result : "");
				}
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

	useEffect(() => {
		if (currentUser) {
			getGroupChat();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadGroup, getMessages, currentUser]);
	// for get or create group-chat end

	// for get or create personal-chat start
	const [getPersonal, setPersonal] = useState("");

	const getPersonalChat = async () => {
		// when student start
		if (currentUser.role === "student") {
			try {
				const response = await fetch("/personal-chat", {
					method: "POST",
					body: JSON.stringify({
						student_id: currentUser.id,
						advisor_id: currentUser.advisor.id
					}),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					setPersonal(result);
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
			// when student end

			// when advisor start
		} else if (currentUser.role === "advisor") {
			if (search) {
				// searching start
				try {
					const response = await fetch(`/personal-chat/${search}`);
					const result = await response.json();
					if (response.status === 200) {
						setSearchUser(result);
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
				// searching end
			} else if (selectedSearch) {
				// for get or create using selected search result start

				try {
					const response = await fetch("/personal-chat", {
						method: "POST",
						body: JSON.stringify({
							student_id: selectedSearch.id,
							advisor_id: selectedSearch.advisor.id
						}),
						headers: { "Content-Type": "application/json" }
					});
					const result = await response.json();

					if (response.status === 200) {
						setPersonal([...getPersonal, result]);
						setMessages(result);
						setSearchUser("");
						setSelectedSearch("");
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
			}
			// for get or create using selected search result end
			else {
				// for get advisor's all student
				try {
					const response = await fetch("/personal-chat");

					const result = await response.json();

					if (response.status === 200) {
						setPersonal(result);
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
			}
		}
	};

	useEffect(() => {
		if (currentUser) {
			getPersonalChat();
			setIsLoading(false);
		}

		if (!search) {
			setSearchUser("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, getMessages]);
	// for get or create personal-chat end

	// for user-box & message-box toggle start
	useEffect(() => {
		if (getMessages) {
			setChatT(true);
			setHideMenu(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getMessages]);
	// for user-box & message-box toggle end

	return (
		<>
			<div className="chat-container">
				<div className="row m-0">
					<div className="col-md-5 col-12 p-0">
						{isMobile ? (
							!chatT && (
								<>
									{isLoading ||
									!(getGroupArray || (getGroup && getPersonal)) ? (
										<ChatBoxSkeleton />
									) : (
										<UserBox
											getGroup={getGroup}
											getPersonal={getPersonal}
											setMessages={setMessages}
											latestGroup={latestGroup}
											setLatestGroup={setLatestGroup}
											latestPersonal={latestPersonal}
											setLatestPersonal={setLatestPersonal}
											search={search}
											setSearch={setSearch}
											setSearchUser={setSearchUser}
											searchUser={searchUser}
											setSelectedSearch={setSelectedSearch}
											getGroupArray={getGroupArray}
										/>
									)}
								</>
							)
						) : (
							<>
								{isLoading || !(getGroupArray || (getGroup && getPersonal)) ? (
									<ChatBoxSkeleton />
								) : (
									<UserBox
										getGroup={getGroup}
										getPersonal={getPersonal}
										setMessages={setMessages}
										latestGroup={latestGroup}
										setLatestGroup={setLatestGroup}
										latestPersonal={latestPersonal}
										setLatestPersonal={setLatestPersonal}
										search={search}
										setSearch={setSearch}
										setSearchUser={setSearchUser}
										searchUser={searchUser}
										setSelectedSearch={setSelectedSearch}
										getGroupArray={getGroupArray}
									/>
								)}
							</>
						)}
					</div>
					<div className="col-md-7 col-12 p-0" id="message-box">
						{isMobile ? (
							chatT && (
								<>
									<MessageBox
										getMessages={getMessages}
										setMessages={setMessages}
										setLatestGroup={setLatestGroup}
										setLatestPersonal={setLatestPersonal}
										setReloadGroup={setReloadGroup}
										messageId={messageId}
										setChatT={setChatT}
										isMobile={isMobile}
									/>
								</>
							)
						) : (
							<MessageBox
								getMessages={getMessages}
								setMessages={setMessages}
								setLatestGroup={setLatestGroup}
								setLatestPersonal={setLatestPersonal}
								setReloadGroup={setReloadGroup}
								messageId={messageId}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
