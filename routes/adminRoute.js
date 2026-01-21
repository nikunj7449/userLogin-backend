const express = require("express")
const adminRouter = express.Router();

const { getUserList, deleteUser, editUser } = require("../controller/admin/adminController");
const {logout} = require("../controller/logoutController")

adminRouter.get("/users", getUserList);
adminRouter.patch("/users/:id", editUser);
adminRouter.delete("/users/:id", deleteUser);
adminRouter.post("/logout", logout);

module.exports = adminRouter;