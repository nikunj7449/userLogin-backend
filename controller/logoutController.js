exports.logout = (req, res) => {
  res.clearCookie("JWT-Token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
 return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
