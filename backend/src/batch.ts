import cron from "node-cron";
import { autoAlert } from "./useCase/autoAlert";
import { autoStaticOrder } from "./useCase/autoStaticOrder";
import { autoAdjustmentOrder } from "./useCase/autoAdjustmentOrder";

cron.schedule("*/30 * * * *", autoAlert);
cron.schedule("*/5 * * * *", autoStaticOrder);
cron.schedule("*/5 * * * *", autoAdjustmentOrder);
