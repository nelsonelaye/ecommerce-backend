const mongoose = require("mongoose");
const ratingModel = mongoose.Schema(
	{
		count: {
			type: Number,
		},

		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "products",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("ratings", ratingModel);
