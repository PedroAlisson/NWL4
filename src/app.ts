import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes/routes";
import createConnection from "./database";
import { AppError } from "./errors/AppError";

createConnection();
const app = express();

app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal Server error ${err.message}`,
    });
  }
);

export { app };
