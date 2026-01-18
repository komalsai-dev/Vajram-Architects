import { Router } from "express";
import {
  addProjectImages,
  deleteProjectImage,
  updateProjectImage,
} from "../controllers/imagesController.js";
import { upload } from "../middleware/upload.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.post(
  "/:projectId/images",
  requireAdmin,
  upload.array("images", 20),
  addProjectImages
);
router.patch("/:projectId/images/:imageId", requireAdmin, updateProjectImage);
router.delete("/:projectId/images/:imageId", requireAdmin, deleteProjectImage);

export default router;
