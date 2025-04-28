import { uploadOnCloudinary } from "./cloudinary.js"; // or wherever your uploadOnCloudinary is

export const uploadFiles = async (files) => {
  const uploadedFiles = {};
  let documentCount = 0;

  for (const key in files) {
    if (files[key]?.[0]?.path) {
      uploadedFiles[key] = await uploadOnCloudinary(files[key][0].path);
      documentCount++;
    }
  }

  return { uploadedFiles, documentCount };
};
