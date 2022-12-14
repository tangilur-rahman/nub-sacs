// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../ContextApi";
import ChatBox from "./ChatBox/ChatBox";
import Header from "./Header/Header";
import InputBox from "./InputBox/InputBox";
import "./MessageBox.css";

const MessageBox = ({
	getMessages,
	setMessages,
	setLatestGroup,
	setLatestPersonal,
	setReloadGroup,
	messageId,
	setChatT,
	isMobile
}) => {
	// for get current-user
	const { currentUser, setUpdateCount } = GetContextApi();

	// for refetching messages
	const [refetching, setRefetching] = useState("");

	// for rending messages array
	const [displayMessages, setDisplayMessages] = useState("");

	// for personal message start
	useEffect(() => {
		if (messageId && !getMessages) {
			(async () => {
				try {
					const response = await fetch(
						`/personal-chat/notification/${messageId}`
					);
					const result = await response.json();
					if (response.status === 200) {
						if (result) {
							setMessages(result);
						} else {
							return;
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
			})();
		} else {
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageId]);
	// for personal message end

	// for group message start
	useEffect(() => {
		if (messageId && !getMessages) {
			(async () => {
				try {
					const response = await fetch(`/group-chat/notification/${messageId}`);
					const result = await response.json();
					if (response.status === 200) {
						if (result) {
							setMessages(result);
						} else {
							return;
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
			})();
		} else {
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageId]);
	// for group message end

	// for notification make-as-read start
	useEffect(() => {
		if (messageId || getMessages) {
			(async () => {
				if (messageId) {
					try {
						const response = await fetch(
							`/notification/make-read/${messageId}`
						);
						const result = await response.json();
						if (response.status === 200) {
							if (result) {
								setUpdateCount(Date.now());
							} else {
								return;
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
				} else if (getMessages) {
					try {
						const response = await fetch(
							`/notification/make-read/${getMessages._id}`
						);
						const result = await response.json();
						if (response.status === 200) {
							if (result) {
								setUpdateCount(Date.now());
							} else {
								return;
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
				}
			})();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageId, getMessages]);
	// for notification make-as-read end

	// for get all messages & attachments
	useEffect(() => {
		if (getMessages) {
			const messageArray = getMessages.messages;
			const attachmentArray = getMessages.attachments;

			if (messageArray && attachmentArray) {
				setDisplayMessages(messageArray.concat(attachmentArray));
			} else if (messageArray) {
				setDisplayMessages(messageArray);
			} else if (attachmentArray) {
				setDisplayMessages(attachmentArray);
			}
		}
	}, [getMessages]);

	useEffect(() => {
		if (refetching) {
			(async () => {
				try {
					const response = await fetch(`/user/messages/${getMessages._id}`);
					const result = await response.json();
					if (response.status === 200) {
						if (result) {
							setMessages(result);
						} else {
							return;
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
			})();
		} else {
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refetching]);

	return (
		<>
			{getMessages ? (
				<div className="message-box">
					{getMessages && (
						<Header
							getMessages={getMessages}
							setReloadGroup={setReloadGroup}
							setChatT={setChatT}
							isMobile={isMobile}
							setMessages={setMessages}
						/>
					)}

					<ChatBox
						displayMessages={displayMessages}
						getMessages={getMessages}
					/>

					{getMessages && (
						<InputBox
							getMessages={getMessages}
							displayMessages={displayMessages}
							setDisplayMessages={setDisplayMessages}
							setLatestGroup={setLatestGroup}
							setLatestPersonal={setLatestPersonal}
							isMobile={isMobile}
							setRefetching={setRefetching}
						/>
					)}
				</div>
			) : (
				<div className="welcome-chat">
					{currentUser?.role !== "administrator" && (
						<h3>
							Select &nbsp;
							<span>
								{currentUser?.role === "student" ? "Advisor" : "Student"}
							</span>
						</h3>
					)}
					<h2>Start Conversation ????</h2>
				</div>
			)}
		</>
	);
};

export default MessageBox;
