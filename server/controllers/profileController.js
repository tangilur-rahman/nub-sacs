// external modules
const bcrypt = require("bcrypt");

// internal modules
const adminModel = require("./../models/administratorModel");
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

const updateInfo = async (req, res) => {
	const { cpassword, newPassword, getPhone, active_status } = req.body;

	try {
		// get current user
		if (!cpassword) {
			res.status(400).json({ error: "please fill-up current-password field." });
		} else {
			// check password
			const comparePassword = await bcrypt.compare(
				cpassword,
				req.currentUser.password
			);

			if (comparePassword) {
				// when password & phone-number both
				if (newPassword && getPhone && active_status) {
					if (newPassword.length < 8) {
						res
							.status(400)
							.json({ error: "Password must be minimum 8 length." });
					} else {
						const hashPassword = await bcrypt.hash(newPassword, 10);
						await advisorModel.updateOne(
							{ _id: req.currentUser._id },
							{
								$set: [
									{ phone: getPhone },
									{ password: hashPassword },
									{ active_status }
								]
							}
						);
						res.status(200).json({
							message:
								"Phone number, active status & password updated successfully."
						});
					}
				} else if (newPassword && getPhone) {
					if (newPassword.length < 8) {
						res
							.status(400)
							.json({ message: "Password must be minimum 8 length." });
					} else {
						const hashPassword = await bcrypt.hash(newPassword, 10);
						await advisorModel.updateOne(
							{ _id: req.currentUser._id },
							{
								$set: [{ phone: getPhone }, { password: hashPassword }]
							}
						);
						res.status(200).json({
							message: "Phone number & password updated successfully."
						});
					}
				} else if (newPassword && active_status) {
					if (newPassword.length < 8) {
						res
							.status(400)
							.json({ message: "Password must be minimum 8 length." });
					} else {
						const hashPassword = await bcrypt.hash(newPassword, 10);
						await advisorModel.updateOne(
							{ _id: req.currentUser._id },
							{
								$set: [{ active_status }, { password: hashPassword }]
							}
						);
						res.status(200).json({
							message: "Active status & password updated successfully."
						});
					}
				} else if (getPhone && active_status) {
					await advisorModel.updateOne(
						{ _id: req.currentUser._id },
						{
							$set: [{ active_status }, { phone: getPhone }]
						}
					);
					res.status(200).json({
						message: "Phone number & active status updated successfully."
					});
				} else {
					// when only phone number
					if (getPhone) {
						await advisorModel.updateOne(
							{ _id: req.currentUser._id },
							{
								$set: { phone: getPhone }
							}
						);
					}

					// when only active-status
					if (active_status) {
						await advisorModel.updateOne(
							{ _id: req.currentUser._id },
							{
								$set: { active_status }
							}
						);
					}

					// when only password
					if (newPassword) {
						if (newPassword.length < 8) {
							res
								.status(400)
								.json({ message: "Password must be minimum 8 length." });
						} else {
							const hashPassword = await bcrypt.hash(newPassword, 10);

							if (req.currentUser.role === "administrator") {
								await adminModel.updateOne(
									{ _id: req.currentUser._id },
									{
										$set: { password: hashPassword }
									}
								);
							} else if (req.currentUser.role === "advisor") {
								await advisorModel.updateOne(
									{ _id: req.currentUser._id },
									{
										$set: { password: hashPassword }
									}
								);
							} else if (req.currentUser.role === "student") {
								await studentModel.updateOne(
									{ _id: req.currentUser._id },
									{
										$set: { password: hashPassword }
									}
								);
							}
						}
					}

					if (getPhone) {
						res
							.status(200)
							.json({ message: "Phone number updated successfully." });
					} else if (active_status) {
						res
							.status(200)
							.json({ message: "Active status updated successfully." });
					} else if (newPassword) {
						res.status(200).json({ message: "Password updated successfully." });
					} else {
						res.status(400).json({ error: "Nothing have to change." });
					}
				}
			} else {
				res.status(500).json({ error: "Invalid Authentication!" });
			}
		}
	} catch (error) {
		res.status(500).json({ error: "Something was Wrong, Try again!" });
	}
};

const changeProfileImg = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			await adminModel.updateOne(
				{ _id: req.currentUser._id },
				{
					$set: { profile_img: req.file.filename }
				}
			);
			res.status(200).json({ message: "Profile-img updated successfully" });
		} else if (req.currentUser.role === "advisor") {
			await advisorModel.updateOne(
				{ _id: req.currentUser._id },
				{
					$set: { profile_img: req.file.filename }
				}
			);
			res.status(200).json({ message: "Profile-img updated successfully" });
		} else if (req.currentUser.role === "student") {
			await studentModel.updateOne(
				{ _id: req.currentUser._id },
				{
					$set: { profile_img: req.file.filename }
				}
			);
			res.status(200).json({ message: "Profile-img updated successfully" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { updateInfo, changeProfileImg };
