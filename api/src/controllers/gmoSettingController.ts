import { Request, Response } from "express";
import { GmoSettingService } from "../service/gmoSetting";
import { createGmoSchema, upedateGmoSchema } from "../schema/gmoSchema";

export const get = async (req: Request, res: Response) => {
  const gmoSettingService = new GmoSettingService();
  const id = parseInt(req.query.id as string, 10);
  const gmoSetting = await gmoSettingService.find(id);
  res.json(gmoSetting);
};

export const create = async (req: Request, res: Response) => {
  const validatedData = createGmoSchema.parse(req.body);
  const gmoSettingService = new GmoSettingService();
  const result = await gmoSettingService.create({ ...validatedData });
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  console.log("gmo", req.body);
  const validatedData = upedateGmoSchema.parse(req.body);
  const gmoSettingService = new GmoSettingService();
  const result = await gmoSettingService.update({
    ...validatedData,
  });
  res.status(200).json(result);
};
