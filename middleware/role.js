const allowRole = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            return res.status(403).json({
            success: false,
            message: "access denied"
            })
        }
        next();
    }
}

module.exports = allowRole;