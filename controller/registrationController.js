const { User } = require("../model/user");

exports.getRegisteration = (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = User.findByUsername(username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  new User(username, email, phone, password).save();

  res.status(201).json({
    success: true,
    message: "User registered successfully"
  });
};