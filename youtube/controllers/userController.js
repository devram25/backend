import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const GenerateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  try {
    if (
      [fullname, username, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(400, "User with email or username already exist");
    }
    console.warn(req.files);
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing");
    }

    //  const avatar = await uploadOnCloudinary(avatarLocalPath)

    var avatar;
    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
      //   console.log("Upload avatar", avatar)
    } catch (error) {
      console.log("Error uploading avatar", error);
      throw new ApiError(500, "Failed to upload avatar");
    }

    var coverImage;
    try {
      coverImage = await uploadOnCloudinary(coverLocalPath);
      //   console.log("Upload coverimage", coverImage)
    } catch (error) {
      console.log("Error uploading cover image", error);
      throw new ApiError(500, "Failed to upload cover image");
    }
    //  if(coverLocalPath){
    //     coverImage = await uploadOnCloudinary(coverLocalPath)
    //  }

    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage.url,
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.log(error);
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }
    throw new ApiError(500, "Failed to upload image and deleted");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from body
  const { email, username, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // validate passowrd
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  // return res.status(200).cookie("accessToken", refreshToken, options).json( new ApiResponse(200, loggedInUser, "User Logged in successfully"))
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser =asyncHandler(async (req,res)=>{
  await User.findByIdAndUpdate(
    // Todo : write middleware
  )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const IncomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
  if (!IncomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }
  try {
    const decodedToken = jwt.verify(
      IncomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (IncomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    const { accessToken, refreshToken: newRefreshToken } =
      await GenerateAccessAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refresh successfully"
        )
      );
  } catch (error) {
     console.log("Error uploading cover image", error);
      throw new ApiError(500, "Failed to upload cover image");
  }
});

export { registerUser, loginUser, refreshAccessToken };
