const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const isAuth = require("./middleware/isAuth");
const cookieParser = require("cookie-parser");

const { getRegisteration } = require("./controller/registrationController");
const { getLogin } = require("./controller/loginController");
const adminRouter = require("./routes/adminRoute")
const userRouter = require("./routes/userRoute");
const allowRole = require("./middleware/role");

const app = express();
/* ---------- MIDDLEWARE ---------- */
app.use(cors({
  //origin: "http://localhost:5173",
  origin: "https://login-user-frontend-qfcj-nm69omsfo-nikunjs-projects-5c033a23.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/auth/check",isAuth,(req, res)=>res.status(200).json({success: true}))//for protected route

/* ---------- PUBLIC ROUTES ---------- */
app.post("/registration", getRegisteration);
app.post("/login", getLogin);

/* ---------- PROTECTED ROUTES ---------- */
app.use("/admin", isAuth, allowRole("admin"), adminRouter)
app.use("/user", isAuth, allowRole("user"), userRouter)

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

const DataBaseURL =
  "mongodb+srv://nikunj:nikunj@userlogin.eqbljb0.mongodb.net/?appName=UserLogin";

mongoose
  .connect(DataBaseURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error in mongoose connection");
  });
