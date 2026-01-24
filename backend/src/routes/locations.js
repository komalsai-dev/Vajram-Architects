import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  getLocation,
  listLocations,
  listLocationProjects,
  updateLocation,
} from "../controllers/locationsController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

import { getOrder } from "../controllers/adminOrderController.js";

const router = Router();

router.get("/", listLocations);
router.get("/order", getOrder); // Public order endpoint
router.post("/", requireAdmin, createLocation);
router.get("/:locationId", getLocation);
router.get("/:locationId/projects", listLocationProjects);
router.patch("/:locationId", requireAdmin, updateLocation);
router.delete("/:locationId", requireAdmin, deleteLocation);

export default router;
