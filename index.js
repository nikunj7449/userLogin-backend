const express = require("express");
const cors = require("cors");
const {User} = require("./model/user");

const app = express();
app.use(cors());
app.use(express.json());

// Save user
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const newUser = new User(req.body.username, req.body.password).save();

    res.json({ message: "Login successful", user: newUser });
});

// Fetch all users
app.get("/users", (req, res) => {
    res.json(User.fetchAll());
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server running on port 5000");
});
