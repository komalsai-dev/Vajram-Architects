import { config } from "../config/env.js";

export const requireAdmin = (req, res, next) => {
  if (!config.adminPassword) {
    return next();
  }
  const provided = req.header("x-admin-password");
  if (!provided || provided !== config.adminPassword) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
};
