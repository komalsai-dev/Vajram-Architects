import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export const uploadBuffer = async (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: config.cloudinary.folder,
      resource_type: "image",
      ...options,
    };
    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });

export const deleteImage = async (publicId) => {
  if (!publicId) {
    return null;
  }
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};
