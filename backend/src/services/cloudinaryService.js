import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export const uploadBuffer = async (buffer, fileName) =>
  new Promise((resolve, reject) => {
    const options = {
      folder: config.cloudinary.folder,
      resource_type: "image",
    };
    if (fileName) {
      options.public_id = fileName;
    }
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
    stream.end(buffer);
  });

export const deleteImage = async (publicId) => {
  if (!publicId) {
    return null;
  }
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};
