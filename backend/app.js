import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { FRONTEND_URL } from "./src/config/index.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

import authRoutes from "./src/routes/auth.route.js";
import itemRoutes from "./src/routes/item.route.js";
import orderRoutes from "./src/routes/order.route.js";
import shopRoutes from "./src/routes/shop.route.js";
import userRoutes from "./src/routes/user.route.js";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/shop", shopRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/order", orderRoutes);

app.use(errorHandler);

export default app;
