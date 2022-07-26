const mongoose = require("mongoose");
const userModel = mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		rating: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ratings",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("users", userModel);
