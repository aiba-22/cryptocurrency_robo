import { Router } from "express";
import {
  get as getLineAccount,
  create as createLineAccount,
  update as updateLineAccount,
} from "../controllers/lineAccountController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getLineAccount));
router.post("/", asyncHandler(createLineAccount));
router.put("/", asyncHandler(updateLineAccount));

export default router;
