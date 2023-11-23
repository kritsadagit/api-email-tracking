import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";

import RecipientsRoutes from "./routes/recipients";
import SendMailRoutes from "./routes/sendmail";
import IndexRoutes from "./routes/indexroutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/recipients", RecipientsRoutes);
app.use("/api/sendmail", SendMailRoutes);
app.use("/", IndexRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const errorMessage = error.message;
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
  }

  res.status(statusCode).json({
    result: false,
    error: errorMessage,
    msg: errorMessage,
  });
});

export default app;
