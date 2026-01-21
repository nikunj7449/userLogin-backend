const express = require("express")
const userRouter = express.Router();

const {logout} = require("../controller/logoutController")

userRouter.post("/logout", logout);

module.exports = userRouter;