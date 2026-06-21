import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: "Opps! Your requested route is not found!!",
    path: req.originalUrl,
  });
};
export default notFound;
