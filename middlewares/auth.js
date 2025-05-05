import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

async function auth(req, res, next) {
  const token = req.cookies?.auth;
  
  if (!token) return res.status(403).json("You are not authorized");

  const result = await jwt.verify(token, "This is secret key");
  if (!result) return res.status(403).json("You are not authorized");

  const user = await UserModel.findById(result.id);
  if (!user) return res.status(403).json("You are not authorized");
  req.userId = result.id;
  next();
}

export default auth;
