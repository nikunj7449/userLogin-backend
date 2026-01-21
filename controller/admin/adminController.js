const  User = require("../../model/user");


exports.getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try{
   const deleteuser = await User.findByIdAndDelete(userId)
   if(deleteuser){
      res.status(200).json({ success: true, message: "User deleted successfully" });
    }
    else{
      res.status(404).json({ success: false, message: "User Not found" })
    }
  }catch(err){
    console.log("error while deleting user:",err)
  }
};

exports.editUser = async(req, res) => {
  console.log(req);
  const userId = req.params.id;
  const { username, email, phone, password } = req.body;
  const newUser = { username, email, phone, password };

  try{
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      newUser,
      { new: true, runValidators: true } 
    );
    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
    }else{
      res.json({ success: true, message: "User updated successfully" });
    }

  }catch(err){
    console.log("error in edit user:",err);
  }

};