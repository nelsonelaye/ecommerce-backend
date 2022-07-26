const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		const user = await userModel.create({ fullName, email, password: hashed });
		res.status(201).json({
			message: "User created successfully",
			data: user,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
const getUser = async (req, res) => {
	try {
		const userf = await userModel.findById(req.params.id);
		res.status(200).json({ status: "success", data: user });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
const updateUser = async (req, res) => {
	try {
		const { fullName, email, password } = req.bo;
		const user = await userModel.findByIdUpdate(
			req.params.id,
			{
				fullName,
			},
			{ new: true },
		);
		res.status(200).json({ status: "success", data: user });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	createUser,
	getUser,
	updateUser,
};
