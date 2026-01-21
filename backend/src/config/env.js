import dotenv from "dotenv";

dotenv.config();

const getEnv = (key, fallback) => {
  const value = process.env[key];
  if (value === undefined || value === "") {
    return fallback;
  }
  return value;
};

export const config = {
  port: Number(getEnv("PORT", "4000")),
  corsOrigin: getEnv("CORS_ORIGIN", "*"),
  adminPassword: getEnv("ADMIN_PASSWORD", ""),
  cloudinary: {
    cloudName: getEnv("CLOUDINARY_CLOUD_NAME", ""),
    apiKey: getEnv("CLOUDINARY_API_KEY", ""),
    apiSecret: getEnv("CLOUDINARY_API_SECRET", ""),
    folder: getEnv("CLOUDINARY_FOLDER", ""),
  },
};
