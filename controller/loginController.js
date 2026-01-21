const User = require("../model/user");
const jwt = require("jsonwebtoken")


exports.getLogin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validation
    if (!username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    //Validate login
    const user = await User.validateLogin(username, password, role);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password or role"
      });
    }

    const jwtToken = await jwt.sign(
      {username,role},
      "JWT_SECRETE",
      { expiresIn:"1h" }
    )

    res.cookie("JWT-Token", jwtToken, {
    httpOnly: true,      
    secure: false,       
    sameSite: "lax",  
    maxAge: 60 * 60 * 1000 
    });

    return res.status(200).json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};
