import { Router } from "express";
import { logoutUser, registerUser } from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import { verifyJWT } from "../middleware/authmiddleware.js";

const userRoute = Router();

userRoute.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// secured routes
userRoute.route("/logout").post(verifyJWT, logoutUser)

export default userRoute;
