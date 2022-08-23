const mongoose = require("mongoose");
const userModel = mongoose.Schema(
	{
		firstName: {
			type: String,
		},

		lastName: {
			type: String,
		},
		country: {
			type: String,
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		zipCode: {
			type: Number,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		}
	},
	{ timestamps: true },
);

module.exports = mongoose.model("users", userModel);
