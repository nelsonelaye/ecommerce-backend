const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
	createProduct,
	updateProduct,
	getProduct,
} = require("../controller/productController");

router.route("/create").post(upload, createProduct);
router.route("/update/:id").patch(updateProduct);
router.route("/").get(getProduct);

module.exports = router;
