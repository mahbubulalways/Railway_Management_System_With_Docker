import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import applicationRoutes from "./routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", applicationRoutes);

// TEST ROUTE
app.get("/", (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    successs: true,
    message: "Server is running",
  });
});

app.use(notFound);
app.use(globalErrorHandler);
export default app;
