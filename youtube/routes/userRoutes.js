import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/userController.js";
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

userRoute.post("/login", loginUser)
userRoute.post("refresh-token", refreshAccessToken)


// secured routes
userRoute.route("/logout").post(verifyJWT, logoutUser)
userRoute.post("/change-password", verifyJWT, changeCurrentPassword)
userRoute.get("/current-user",verifyJWT, getCurrentUser )
userRoute.get("/c/:username", verifyJWT, getUserChannelProfile)
userRoute.patch("/update-account", verifyJWT, updateAccountDetails)
userRoute.patch("/avatar", verifyJWT,upload.single("avatar"), updateUserAvatar)
userRoute.patch("/cover-image", verifyJWT,upload.single("coverImage") , updateUserCoverImage)
userRoute.get("/history", verifyJWT, getWatchHistory)

export default userRoute;
