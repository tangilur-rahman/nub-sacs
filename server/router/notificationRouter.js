// external modules
const express = require("express");

// sub-router
const notification = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const {
	getNotifications,
	createNotification,
	makeAllRead,
	makeRead
} = require("../controllers/notificationController");

// for get all notifications
notification.get("/", authUser, getNotifications);

// for create or update notifications
notification.put("/", authUser, createNotification);

// for make read  all-notification
notification.get("/read", authUser, makeAllRead);

// for make read specific-notification
notification.get("/make-read/:_id", authUser, makeRead);

module.exports = notification;
