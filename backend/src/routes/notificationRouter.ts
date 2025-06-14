import { Router } from "express";
import { sendToLine } from "../controllers/notificationController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/line", asyncHandler(sendToLine));

export default router;
