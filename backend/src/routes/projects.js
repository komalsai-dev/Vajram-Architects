import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "../controllers/projectsController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.get("/", listProjects);
router.post("/", requireAdmin, createProject);
router.get("/:projectId", getProject);
router.patch("/:projectId", requireAdmin, updateProject);
router.delete("/:projectId", requireAdmin, deleteProject);

export default router;
