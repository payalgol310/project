
import { Router } from 'express';
import User from '../models/user.js';

const router = Router();



router.get("/add-user", (req, res) => {
    res.render("add-user");
  });

router.post("/add", async (req, res) => {
    const { userName, email, password } = req.body;
      await User.create({ userName, email, password });
      res.redirect("/");
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
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect("/");
});

export default router;