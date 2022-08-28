// external modules

// internal modules
const notificationModel = require("./../models/notificationModel");

// for get all notifications documents
const getNotifications = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const notifications = await notificationModel.findOne({
				id: "administrator"
			});
			if (notifications) {
				res.status(200).json(notifications.notification);
			}
		} else if (req.currentUser.role === "advisor") {
			const notifications = await notificationModel.findOne({
				id: req.currentUser._id
			});

			const notificationsGroup = await notificationModel.findOne({
				id: `advisor-${req.currentUser._id}`
			});

			if (notifications && notificationsGroup) {
				const notificationArray = notifications.notification.concat(
					notificationsGroup.notification
				);

				res.status(200).json(notificationArray);
			} else if (notifications) {
				res.status(200).json(notifications.notification);
			}
		} else if (req.currentUser.role === "student") {
			const notifications = await notificationModel.findOne({
				id: req.currentUser._id
			});

			const notificationsGroup = await notificationModel.findOne({
				id: `student-${req.currentUser.advisor._id}`
			});

			if (notifications && notificationsGroup) {
				const notificationArray = notifications.notification.concat(
					notificationsGroup.notification
				);

				res.status(200).json(notificationArray);
			} else if (notifications) {
				res.status(200).json(notifications.notification);
			}
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for create notification document
const createNotification = async (req, res) => {
	const {
		id,
		sender_name,
		sender_profile,
		kind,
		text,
		last_message,
		time,
		from_where
	} = req.body;

	try {
		const document = await notificationModel.findOne({
			id: id
		});

		if (document) {
			document.notification.push({
				sender_name,
				sender_profile,
				kind,
				text,
				last_message,
				time,
				from_where
			});

			await document.save();
			res.status(200).json({ message: "notification update successfully" });
		} else {
			const createDocument = await notificationModel({
				id
			});
			createDocument.notification.push({
				sender_name,
				sender_profile,
				kind,
				text,
				last_message,
				time
			});

			await createDocument.save();
			res.status(200).json({ message: "notification update successfully" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for make as read all notifications
const makeAllRead = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const document = await notificationModel.findOne({
				id: "administrator"
			});

			if (document) {
				document.notification.map((value) => (value.isRead = true));

				document.save();
				res.status(200).json({ message: "successfully update" });
			}
		} else if (req.currentUser.role === "advisor") {
			const document = await notificationModel.findOne({
				id: req.currentUser._id
			});

			if (document) {
				document.notification.map((value) => (value.isRead = true));
				document.save();
			}

			const groupNotification = await notificationModel.findOne({
				id: `advisor-${req.currentUser._id}`
			});

			if (groupNotification) {
				groupNotification.notification.map((value) => (value.isRead = true));
				groupNotification.save();
			}

			res.status(200).json({ message: "successfully update" });
		} else if (req.currentUser.role === "student") {
			const document = await notificationModel.findOne({
				id: req.currentUser._id
			});

			if (document) {
				document.notification.map((value) => (value.isRead = true));
				document.save();
			}

			const groupNotification = await notificationModel.findOne({
				id: `student-${req.currentUser.advisor._id}`
			});

			if (groupNotification) {
				groupNotification.notification.map((value) => (value.isRead = true));
				groupNotification.save();
			}

			res.status(200).json({ message: "successfully update" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for make as read specific notifications
const makeRead = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const document = await notificationModel.findOne({
				id: "administrator"
			});

			if (document) {
				document.notification.map((value) => {
					if (value.from_where === req.params._id) {
						value.isRead = true;
					}
				});

				document.save();
				res.status(200).json({ message: "successfully update" });
			}
		} else if (req.currentUser.role === "advisor") {
			const document = await notificationModel.findOne({
				id: req.currentUser._id
			});

			if (document) {
				document.notification.map((value) => {
					if (value.from_where === req.params._id) {
						value.isRead = true;
					}
				});
				document.save();
			}

			const groupNotification = await notificationModel.findOne({
				id: `advisor-${req.currentUser._id}`
			});

			if (groupNotification) {
				groupNotification.notification.map((value) => {
					if (value.from_where === req.params._id) {
						value.isRead = true;
					}
				});
				groupNotification.save();
			}

			res.status(200).json({ message: "successfully update" });
		} else if (req.currentUser.role === "student") {
			const document = await notificationModel.findOne({
				id: req.currentUser._id
			});

			if (document) {
				document.notification.map((value) => {
					if (value.from_where === req.params._id) {
						value.isRead = true;
					}
				});

				document.save();
			}

			const groupNotification = await notificationModel.findOne({
				id: `student-${req.currentUser.advisor._id}`
			});

			if (groupNotification) {
				groupNotification.notification.map((value) => {
					if (value.from_where === req.params._id) {
						value.isRead = true;
					}
				});

				groupNotification.save();
			}

			res.status(200).json({ message: "successfully update" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getNotifications,
	createNotification,
	makeAllRead,
	makeRead
};
