import jwt from "jsonwebtoken";
import { User } from "../../models/user/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    // console.log("user generated access token", user);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating access token and refresh token", error);
    throw new ApiError(
      500,
      "Error while generating access token and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      userName,
      email,
      phone,
      fullName,
      state,
      city,
      pinCode,
      address,
      taluk,
      village,
      password,
    } = req.body;

    console.log("req.files", req.file);
    if (
      [
        userName,
        email,
        phone,
        fullName,
        state,
        city,
        pinCode,
        address,
        taluk,
        village,
        password,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
      $or: [{ email }, { userName }],
    });
    if (existedUser) {
      throw new ApiError(409, "User with email or user name already exists");
    }

    let profileImage = "";

    if (req.file) {
      console.log("req.files", req.file.path);
      profileImage = req.file.path;
    }

    console.log("avatarLocalPath", profileImage);

    if (!profileImage) {
      throw new ApiError(400, "Photo is required");
    }
    console.log("profileImage -- ", profileImage);

    const profilePhoto = await uploadOnCloudinary(profileImage);
    if (!profilePhoto) {
      throw new ApiError(400, "Profile Photo is required");
    }

    const user = await User.create({
      userName: userName.toLowerCase(),
      email,
      phone,
      fullName,
      password,
      state,
      city,
      pinCode,
      address,
      taluk,
      village,
      profileImage: profilePhoto.url,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    console.log("createdUser", createdUser);

    if (!createdUser) {
      console.log("deleted file if user not registered", res);

      throw new ApiError(500, "Something went wrong while creating the user");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User created successfully"));
  } catch (error) {
    console.log("Error while registering user", error);
    throw new ApiError(400, error || "Error while registering user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  console.log("userName, email, password", userName, email, password);
  try {
    // req body => data
    // userName or email and password
    // find the user
    // if available then check password
    // access and refresh token create and send in cookie

    // const { userName, email, password } = req.body;

    console.log("userName, email, password", userName, email, password);

    if (!userName && !email) {
      throw new ApiError(400, "User name or email is required");
    }
    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    // token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User is logged in successfully !"
        )
      );
  } catch (error) {
    console.log("Error while login user", error);
    throw new ApiError(401, error || "Error while login user");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    console.log("req in logout user", req.user);
    const logoutUser = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(
        new ApiResponse(200, { logoutUser }, "User logged out successfully")
      );
  } catch (error) {
    console.log("Error while logging out user", error);
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user?._id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: user, accessToken, refreshToken: newRefreshToken },
          "Access and refresh token refreshed successfully"
        )
      );
  } catch (error) {
    console.log("Error while refreshing access token", error);
    throw new ApiError(
      401,
      "error.message || Error while refreshing access token"
    );
  }
});

const currentUser = asyncHandler(async (req, res) => {
  try {
    // console.log("getting current user", req.user);
    res
      .status(200)
      .json(new ApiResponse(200, { user: req.user }, "Current user"));
  } catch (error) {
    console.log("Error while getting current user", error);
    throw new ApiError(
      401,
      error.message || "Error while getting current user"
    );
  }
});
const deleteFileFromCloudinary = asyncHandler(async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;

    const res = await deleteFromCloudinary(imageUrl);
    console.log("public_id is", res);
  } catch (error) {
    console.log("Error while deleting file from cloudinary", error);
    throw new ApiError(401, "Error while deleting file from cloudinary");
  }
});
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  currentUser,
  deleteFileFromCloudinary,
};
