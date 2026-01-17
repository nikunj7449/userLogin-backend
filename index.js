const express = require("express");
const cors = require("cors");
const { getRegisteration } = require("./controller/registrationController");
const { getLogin } = require("./controller/loginController");
const { getUserList,deleteUser,editUser } = require("./controller/adminController");

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.post("/registration", getRegisteration);

app.post("/login", getLogin);

app.get("/users", getUserList );

app.patch("/users/:id", editUser);

app.delete("/users/:id", deleteUser);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
