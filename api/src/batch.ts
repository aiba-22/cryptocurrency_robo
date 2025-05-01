import cron from "node-cron";
import PriceAlert from "./service/priceAlert";
import Line from "./service/line";
import GmoService from "./service/gmo";
import { error } from "console";

const notificationControllers = async () => {
  const id = 1; //現状アカウント登録機能がついてないため、一つ目のIDを指定する。アカウント登録できるようになったら複数配信にする。
  const priceAlertService = new PriceAlert();

  const priceAlert = await priceAlertService.find(id);
  if (!priceAlert.id) return;

  const { isUpperLimit, symbol, price } = priceAlert.conditions;

  const gmoService = new GmoService();

  const cryptocurrencyTradingPrice = await gmoService.fetchTradingPrice(symbol);

  const shouldNotify =
    (isUpperLimit && cryptocurrencyTradingPrice > price) ||
    (!isUpperLimit && cryptocurrencyTradingPrice < price);

  if (!shouldNotify) return;

  const lineService = new Line();
  await lineService.send({ id, price: cryptocurrencyTradingPrice });
};

const autoTorading = async () => {
  console.log("自動取引開始");

  // TODO: データベースからAPIキーとシークレットキーを取得

  // TODO: 現在の価格を取得
  const targetPrice = 500;

  // TODO: 売りと買いの判定に対しての評価
  const isBuyTargetPrice = true;
  const isSellTargetPrice = false;

  if (isBuyTargetPrice) {
    // 売り注文を実行
    // TODO: 成功のログをテーブルに保存
  }
  if (isSellTargetPrice) {
    // 買い注文を実行
    // TODO: 成功のログをテーブルに保存
  }
  console.log("取引終了");
};

// 五分毎にLINE通知を送信するバッチ処理
cron.schedule("*/5 * * * *", notificationControllers);

cron.schedule("*/5 * * * *", autoTorading);
