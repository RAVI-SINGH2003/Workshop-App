import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import {config} from "dotenv";
import cors from "cors";
export const app = express();

//Middlewares
config({ path: "./config/config.env" });
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//Importing & Using Routes
import workshop from "./routes/workshopRoute.js"
app.use('/api/v1/workshop',workshop)

//Error Middleware
app.use(errorMiddleware);




