import cron from "node-cron";
import { autoOrder } from "./useCase/autoOrder";
import { autoAlert } from "./useCase/autoAlert";

cron.schedule("*/30 * * * *", autoAlert);
cron.schedule("*/30 * * * *", autoOrder);
