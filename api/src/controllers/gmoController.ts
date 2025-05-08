import { Request, Response } from "express";
import GmoService from "../service/gmo";
import { createGmoSchema, updateGmoSchema } from "../schema/gmoSchema";

export const get = async (req: Request, res: Response) => {
  const gmoService = new GmoService();
  const result = await gmoService.find();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const validatedData = createGmoSchema.parse(req.body);
  const gmoService = new GmoService();
  const result = await gmoService.create(validatedData);
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const validatedData = updateGmoSchema.parse(req.body);
  const gmoService = new GmoService();
  const result = await gmoService.update(validatedData);
  res.status(200).json(result);
};
