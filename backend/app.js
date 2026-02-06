import cors from "cors";
import express from "express";

import { FRONTEND_URL } from "./src/config/index.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

import authRoutes from "./src/routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
