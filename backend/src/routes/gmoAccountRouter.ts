import { Router } from "express";
import {
  get as getGmoAccount,
  create as createGmoAccount,
  update as updateGmoAccount,
} from "../controllers/gmoAccountController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getGmoAccount));
router.post("/", asyncHandler(createGmoAccount));
router.put("/", asyncHandler(updateGmoAccount));

export default router;
