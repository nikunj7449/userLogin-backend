const  User  = require("../model/user");
const bcrypt = require("bcrypt");

exports.getRegisteration = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    if (!username || !email || !phone || !password ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const passwordEcrypt = await bcrypt.hash(password,10) 
    await User.create({ username, email, phone, password : passwordEcrypt, role});

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error)

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
};
