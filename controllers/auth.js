import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

async function register(req, res) {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Enter password" });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await UserModel.create({ ...req.body, password: hashedPassword });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "This is secret key"
  );

  res.cookie("auth", token);

  res.redirect("/user-list")

  res.status(200).json({
    message: "register successfully",
    user
  });

  // res.redirect("/")

}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "This is secret key"
  );

  res.cookie("auth", token);

  res.redirect("/user-list")
  
  res.status(200).json({
      message: "Logged in successfully",
      user
    });

}

async function logout(req, res) {
  res.clearCookie("auth");
  res.redirect('/auth/login');
  res.status(200).json({ message: "Logged out successfully" });
 
}

export { register, login , logout };
