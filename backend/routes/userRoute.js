import express from "express";
import { loginUser, registerUser, adminLogin , saveCart  } from "../controllers/userController.js";

const userRouter = express.Router();

// Route for admin login
userRouter.post("/admin", adminLogin);

// Other user routes
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/save-cart", saveCart);

export default userRouter;