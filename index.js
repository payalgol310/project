import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import dbConnections from "./configs/db.js";
import auth from "./middlewares/auth.js";
import user from "./models/user.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));


app.set("view engine", "ejs");

dbConnections();


app.use("/auth", authRouter);
app.use("/task", auth, taskRouter);


app.get("/user",auth,async(req,res)=>{
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId).select("-password");
    if(!user) return res.status(404).json({message:"User not found"});
    res.status(200).json({
      message:"User found",
      user
    })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({message:"Server error"});
  }
})


app.use("/user", userRouter);

app.get("/", async (req, res) => {
  const users = await user.find();
  res.render("index", { users });
});


app.listen(3000, () => console.log("Server running on port 3000"));
