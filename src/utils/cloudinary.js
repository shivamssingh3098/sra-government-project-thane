import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

// Configuration
console.log(
  "process.env.CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET",
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

// CLOUDINARY_CLOUD_NAME = dm6zltpzm;
// CLOUDINARY_API_KEY = 385278456424974;
// CLOUDINARY_API_SECRET = KLLak1RknInIRL3_DBLoaZzDrRc;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dm6zltpzm",
  api_key: "385278456424974",
  api_secret: "KLLak1RknInIRL3_DBLoaZzDrRc",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });
    // setting of uploaded files on cloudinary

    console.log("file uploaded successfully ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error while uploading cloudinary", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    console.log("image url: ", imageUrl);
    let public_id = "";
    // console.log("image url to delete", imageUrl);
    if (!imageUrl.includes("/")) {
      // console.log("image url is available", imageUrl);
      public_id = imageUrl;
    } else {
      const lastIndexOfSlace = imageUrl.lastIndexOf("/");
      const lastIndexOfDot = imageUrl.lastIndexOf(".");
      public_id = imageUrl.substring(lastIndexOfSlace + 1, lastIndexOfDot);
    }
    console.log("image url to delete", public_id);
    const deletedFileResponse = await cloudinary.uploader.destroy(public_id);
    return deletedFileResponse;
  } catch (error) {
    console.log("Error while deleting from cloudinary", error);
    throw new ApiError(500, "Error while deleting from cloudinary");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
