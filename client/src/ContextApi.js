// external components
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

// internal components
import { Viewport } from "./components/Viewport";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// establish connection with socket-server
	const [mySocket, setMySocket] = useState();

	useEffect(() => {
		// setMySocket(io.connect("http://localhost:4000"));
		// setMySocket(io.connect("https://live-sacs.herokuapp.com"));
		setMySocket(io.connect("http://nubsacs.deltadevbd.com"));
	}, []);

	// for get & set current user
	const [currentUser, setCurrentUser] = useState("");

	// for when submitted appointment, refetching data in dashboard
	const [isSubmitted, setIsSubmitted] = useState("");

	// for update notifications for advisor & student
	const [notifiUpdate, setNotifiUpdate] = useState("");

	// for update notifications for admin
	const [notifiUpdateAdmin, setNotifiUpdateAdmin] = useState("");

	// for notification count update from massage-box
	const [updateCount, setUpdateCount] = useState("");

	// when message-box visible => menubar hidden
	const [hideMenu, setHideMenu] = useState("");

	// for checking mobile view-port achieve or not
	const isMobile = Viewport("(max-width:768px)", true);

	return (
		<>
			<rootContext.Provider
				value={{
					mySocket,
					currentUser,
					setCurrentUser,
					isSubmitted,
					setIsSubmitted,
					notifiUpdate,
					setNotifiUpdate,
					notifiUpdateAdmin,
					setNotifiUpdateAdmin,
					updateCount,
					setUpdateCount,
					hideMenu,
					setHideMenu,
					isMobile
				}}
			>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
