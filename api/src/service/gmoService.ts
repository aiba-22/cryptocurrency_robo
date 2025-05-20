import { GmoRepository } from "../db/repositories/gmoRepository";
import db from "../db/db";
import { USER_ID } from "./constants";
export default class GmoService {
  async find() {
    const gmoRepository = new GmoRepository();
    const gmo = await gmoRepository.findById(USER_ID);
    if (!gmo) return;

    return {
      id: gmo.id,
      apiKey: gmo.api_key,
      secretKey: gmo.secret_key,
    };
  }

  async create({ apiKey, secretKey }: { apiKey: string; secretKey: string }) {
    const transaction = await db.transaction();
    const gmoRepository = new GmoRepository(transaction);
    try {
      await gmoRepository.create({
        apiKey,
        secretKey,
      });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }

  async update({
    id,
    apiKey,
    secretKey,
  }: {
    id: number;
    apiKey: string;
    secretKey: string;
  }) {
    const transaction = await db.transaction();
    const gmoRepository = new GmoRepository(transaction);
    try {
      await gmoRepository.update({ id, apiKey, secretKey });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }
}
