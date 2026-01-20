import { Router } from "express";
import locationRoutes from "./locations.js";
import projectRoutes from "./projects.js";
import imageRoutes from "./images.js";
import adminRoutes from "./admin.js";

const router = Router();

router.use("/locations", locationRoutes);
router.use("/projects", projectRoutes);
router.use("/projects", imageRoutes);
router.use("/admin", adminRoutes);

export default router;
