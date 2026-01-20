import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.get("/verify", requireAdmin, (req, res) => {
  res.json({ status: "ok" });
});

export default router;
