import { Router } from "express";
import {
  create as createCryptocurrencyAdjustmentOrder,
  update as updateCryptocurrencyAdjustmentOrder,
  get as getCryptocurrencyAdjustmentOrder,
} from "../controllers/cryptocurrencyAdjustmentOrderController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.get("/", asyncHandler(getCryptocurrencyAdjustmentOrder));
router.post("/", asyncHandler(createCryptocurrencyAdjustmentOrder));
router.put("/", asyncHandler(updateCryptocurrencyAdjustmentOrder));

export default router;
