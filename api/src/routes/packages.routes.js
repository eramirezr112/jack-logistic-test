import { Router } from "express";
import {
  getPackages,
  getPackageById,
  addPackage,
} from "../controllers/packages.controller";

const router = Router();

router.get("/packages", getPackages);
router.get("/packages/:codPackage", getPackageById);
router.post("/packages/addPackage", addPackage);

export default router;
