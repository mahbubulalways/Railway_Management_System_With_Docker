import { Response } from "express";

interface TData<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data?: T;
}

const sendResponse = <T>(res: Response, data: TData<T>) => {
  return res.status(data.statusCode).json(data);
};

export default sendResponse;
