import jwt from "jsonwebtoken";
import { Admin } from "../../models/admin/admin.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    // console.log("user generated access token", user);

    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();
    admin.refreshToken = refreshToken;

    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating access token and refresh token", error);
    throw new ApiError(
      500,
      "Error while generating access token and refresh token"
    );
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
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
    const existedAdmin = await Admin.findOne({
      $or: [{ email }, { userName }],
    });
    if (existedAdmin) {
      throw new ApiError(409, "Admin with email or user name already exists");
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
    const profilePhoto = await uploadOnCloudinary(profileImage);
    if (!profilePhoto) {
      throw new ApiError(400, "Profile Photo is required");
    }

    const admin = await Admin.create({
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
      userType: "ADMIN",
      profileImage: profilePhoto.url,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );

    console.log("createdAdmin", createdAdmin);

    if (!createdAdmin) {
      console.log("deleted file if admin not registered", res);

      throw new ApiError(500, "Something went wrong while creating the admin");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdAdmin, "Admin created successfully"));
  } catch (error) {
    console.log("Error while registering admin", error);
    throw new ApiError(401, error || "Error while registering admin");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
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
      throw new ApiError(400, "admin name or email is required");
    }
    const admin = await Admin.findOne({ $or: [{ userName }, { email }] });

    if (!admin) {
      throw new ApiError(404, "Admin does not exist");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid Admin credentials");
    }

    // token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      admin._id
    );

    const loggedInAdmin = await Admin.findById(admin._id).select(
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
          { admin: loggedInAdmin, accessToken, refreshToken },
          "Admin is logged in successfully !"
        )
      );
  } catch (error) {
    console.log("Error while login admin", error);
    throw new ApiError(401, error || "Error while login admin");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  try {
    console.log("req in logout admin", req.admin);
    const logoutAdmin = await Admin.findByIdAndUpdate(
      req.admin?._id,
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
        new ApiResponse(200, { logoutAdmin }, "Admin logged out successfully")
      );
  } catch (error) {
    console.log("Error while logging out admin", error);
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

    const admin = await Admin.findById(decodedRefreshToken?._id);

    if (!admin) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== admin?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(admin?._id);
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
          { admin: admin, accessToken, refreshToken: newRefreshToken },
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

const currentAdmin = asyncHandler(async (req, res) => {
  try {
    console.log("getting current admin", req.admin);
    res
      .status(200)
      .json(new ApiResponse(200, { admin: req.admin }, "Current admin"));
  } catch (error) {
    console.log("Error while getting current admin", error);
    throw new ApiError(
      401,
      error.message || "Error while getting current admin"
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
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  currentAdmin,
  deleteFileFromCloudinary,
};
