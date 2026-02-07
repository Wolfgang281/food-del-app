import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (filePath, next) => {
  try {
    let uploadedResult = await cloudinary.uploader.upload(filePath, {
      folder: "food-delivery-app",
      resource_type: "image",
    });
    return uploadedResult.secure_url;
  } catch (error) {
    next(error);
  }
};

export const deleteFromCloudinary = async (publicId, next) => {
  try {
    let deletedResult = await cloudinary.uploader.destroy(publicId);
    return deletedResult;
  } catch (error) {
    next(error);
  }
};

export const getDataURLFromFile = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};
