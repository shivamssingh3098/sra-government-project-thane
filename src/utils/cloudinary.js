import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

    console.log("file uploaded successfully ", response);
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
