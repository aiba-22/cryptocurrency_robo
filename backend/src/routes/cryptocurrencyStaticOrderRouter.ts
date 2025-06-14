import { Router } from "express";
import {
  create as createCryptocurrencyStaticOrder,
  update as updateCryptocurrencyStaticOrder,
  list as listCryptocurrencyStaticOrder,
} from "../controllers/cryptocurrencyStaticOrderController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.get("/list", asyncHandler(listCryptocurrencyStaticOrder));
router.post("/", asyncHandler(createCryptocurrencyStaticOrder));
router.put("/", asyncHandler(updateCryptocurrencyStaticOrder));
export default router;
