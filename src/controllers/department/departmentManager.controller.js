import jwt from "jsonwebtoken";
import { DepartmentManager } from "../../models/departmentManager/departmentManager.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (departmentManagerId) => {
  try {
    const departmentManager =
      await DepartmentManager.findById(departmentManagerId);
    // console.log("user generated access token", user);

    const accessToken = await departmentManager.generateAccessToken();
    const refreshToken = await departmentManager.generateRefreshToken();
    departmentManager.refreshToken = refreshToken;

    await departmentManager.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating access token and refresh token", error);
    throw new ApiError(
      500,
      "Error while generating access token and refresh token"
    );
  }
};

const registerDepartmentManager = asyncHandler(async (req, res) => {
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
      department,
      userType,
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
        department,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const existedDepartmentManager = await DepartmentManager.findOne({
      $or: [{ email }, { userName }],
    });
    if (existedDepartmentManager) {
      throw new ApiError(
        409,
        "Department Manager with email or user name already exists"
      );
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
    console.log("userType", userType);

    const departmentManager = await DepartmentManager.create({
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
      department,
      userType,
      profileImage: profilePhoto.url,
    });

    const createdDepartmentManager = await DepartmentManager.findById(
      departmentManager._id
    ).select("-password -refreshToken");

    console.log("createdDepartmentManager", createdDepartmentManager);

    if (!createdDepartmentManager) {
      console.log("deleted file if Department Manager not registered", res);

      throw new ApiError(
        500,
        "Something went wrong while creating the department manager"
      );
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          createdDepartmentManager,
          "Department Manager created successfully"
        )
      );
  } catch (error) {
    console.log("Error while registering department Manager", error);
    throw new ApiError(
      400,
      error || "Error while registering department Manager"
    );
  }
});

const loginDepartmentManager = asyncHandler(async (req, res) => {
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
    const departmentManager = await DepartmentManager.findOne({
      $or: [{ userName }, { email }],
    });

    if (!departmentManager) {
      throw new ApiError(404, "Department Manager does not exist");
    }

    const isPasswordValid = await departmentManager.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid Department Manager credentials");
    }

    // token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      departmentManager._id
    );

    const loggedInDepartmentManager = await DepartmentManager.findById(
      departmentManager._id
    ).select("-password -refreshToken");

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
          {
            departmentManager: loggedInDepartmentManager,
            accessToken,
            refreshToken,
          },
          "Department Manager is logged in successfully !"
        )
      );
  } catch (error) {
    console.log("Error while login Department Manager", error);
    throw new ApiError(401, error || "Error while login Department Manager");
  }
});

const logoutDepartmentManager = asyncHandler(async (req, res) => {
  try {
    console.log("req in logout departmentManager", req.departmentManager);
    const logoutDepartmentManager = await DepartmentManager.findByIdAndUpdate(
      req.departmentManager?._id,
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
        new ApiResponse(
          200,
          { logoutDepartmentManager },
          "Department Manager logged out successfully"
        )
      );
  } catch (error) {
    console.log("Error while logging out Department Manager", error);
    throw new ApiError(
      401,
      error || "Error while logging out Department Manager"
    );
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

    const departmentManager = await DepartmentManager.findById(
      decodedRefreshToken?._id
    );

    if (!departmentManager) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== departmentManager?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(departmentManager?._id);
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
          {
            departmentManager: departmentManager,
            accessToken,
            refreshToken: newRefreshToken,
          },
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

const currentDepartmentManager = asyncHandler(async (req, res) => {
  try {
    console.log("getting current department Manager", req.departmentManager);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { departmentManager: req.departmentManager },
          "Current departmentManager"
        )
      );
  } catch (error) {
    console.log("Error while getting current departmentManager", error);
    throw new ApiError(
      401,
      error.message || "Error while getting current department Manager"
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
  registerDepartmentManager,
  loginDepartmentManager,
  logoutDepartmentManager,
  refreshAccessToken,
  currentDepartmentManager,
  deleteFileFromCloudinary,
};
