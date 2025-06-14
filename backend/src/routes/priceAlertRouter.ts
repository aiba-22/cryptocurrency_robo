import { Router } from "express";
import {
  get as getPriceAlert,
  create as createPriceAlert,
  update as updatePriceAlert,
} from "../controllers/priceAlertController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getPriceAlert));
router.post("/", asyncHandler(createPriceAlert));
router.put("/", asyncHandler(updatePriceAlert));
export default router;
