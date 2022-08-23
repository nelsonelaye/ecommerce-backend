const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      res.status(400).json({
        message: "User already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(16);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashed,
      });

      res.status(201).json({
        status: "success",
        data: newUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const UserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      const checkpassword = await bcrypt.compare(password, checkEmail.password);
      if (checkpassword) {
        const token = jwt.sign(
          {
            _id: checkEmail._id,
            firstName: checkEmail.firstName,
            lastName: checkEmail.lastName,
            email: checkEmail.email,
          },
          "mySecret123",
          { expiresIn: "1d" }
        );
        const { password, ...rest } = checkEmail._doc;
        res.status(200).json({
          status: " Successful",
          data: { token, ...rest },
        });
      } else {
        res.status(400).json({
          message: "Password is incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "Email not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createUser, UserSignin, updateUser };
