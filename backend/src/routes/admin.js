import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { getOrder, updateLocationOrder, updateProjectOrder, updateImageOrder } from "../controllers/adminOrderController.js";

const router = Router();

router.get("/verify", requireAdmin, (req, res) => {
  res.json({ status: "ok" });
});

router.get("/order", requireAdmin, getOrder);
router.put("/order/locations", requireAdmin, updateLocationOrder);
router.put("/order/projects", requireAdmin, updateProjectOrder);
router.put("/order/images", requireAdmin, updateImageOrder);

export default router;
