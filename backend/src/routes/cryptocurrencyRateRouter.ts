import { Router } from "express";
import { get as getCryptocurrencyRate } from "../controllers/cryptocurrencyRateController";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.get("/", asyncHandler(getCryptocurrencyRate));

export default router;
