const userModel = require("../model/userModel");
const productModel = require("../model/productModel");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    // const user = await userModel.findById(req.params.id)
    const product = await productModel.create({
      title,
      description,
      price,
      quantity,
      status: true,
      image: req.file.path,
    });

    res.status(201).json({
      message: "success",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await productModel.find();

    res.status(200).json({
      message: "success",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    const { title, quantity } = req.body;
    const good = await productModel.findById(Id);
    if (good.quantity < 1) {
      await productModel.findByIdAndUpdate(
        Id,
        {
          status: false,
        },
        { new: true }
      );

      res.status(201).json({
        message: "no product found",
      });
    } else if (good.quantity < quantity) {
      res.status(201).json({
        message: `can't order above ${good.quantity} because ${quantity} is not greater than ${good.quantity}`,
      });
    } else {
      const product = await productModel.findByIdAndUpdate(
        Id,
        {
          title,
          quantity: good.quantity - quantity,
          status: true,
        },
        { new: true }
      );

      if (good.quantity < 1) {
        await productModel.findByIdAndUpdate(
          Id,
          {
            status: false,
          },
          { new: true }
        );
        res.status(201).json({
          message: "no product found",
        });
      }

      res.status(201).json({
        message: "success",
        data: product,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
module.exports = { createProduct, updateProduct, getProduct };
