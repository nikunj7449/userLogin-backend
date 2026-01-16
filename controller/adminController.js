const { User } = require("../model/user");

exports.getUserList = (req, res) => {
  res.json(User.fetchAll());
};

exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const success = User.deleteUserById(userId);
    if (success) {
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
};
exports.editUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { username, email, phone, password } = req.body;
  const newData = { username, email, phone, password };
    const success = User.editUserById(userId, newData);
    if (success) {
        res.json({ success: true, message: "User updated successfully" });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
};