import express, { Express, Request, Response } from "express";
import { database } from "./db/index";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import morgan from "morgan";
dotenv.config();
// This ensures the database connection is established before handling requests
database._connect();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", apiRoutes);

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("Unhandled Promise Rejection:", reason);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
