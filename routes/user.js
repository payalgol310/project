
import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const router = Router();




router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.render("index", { users });
});



router.get("/add-user", (req, res) => {
    res.render("add-user");
  });

router.post("/add", async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
      await User.create({ userName, email, password: hashedPassword });
      res.redirect("/user-list");
    });


router.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.render("edit-user", { user });
});

router.post("/update/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  res.redirect("/user-list");
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect("/user-list");
});

export default router;