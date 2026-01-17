const { User } = require("../model/user");

exports.getLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const isValid = User.validateLogin(username, password);

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }

  res.json({
    success: true,
    message: "Login successful"
  });
}