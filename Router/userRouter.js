const express = require("express")

const router = express.Router()
const { createUser, UserSignin, updateUser} = require("../controller/userController")




router.post("/user", createUser)
router.post("/user/signin",UserSignin )
router.patch("/user/update/:id", updateUser)




module.exports =router