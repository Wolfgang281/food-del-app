import { Router } from "express";
import { createShop, editShop } from "../controllers/shop.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const shopRouter = Router();

shopRouter.post("/create", authenticate, createShop);

shopRouter.patch(
  "/edit/:shopId",
  upload.single("image"),
  authenticate,
  editShop,
);

export default shopRouter;
