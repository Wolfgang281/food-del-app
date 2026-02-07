import { Router } from "express";
import { addItem, editItem } from "../controllers/item.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const itemRouter = Router();

itemRouter.post("/add", authenticate, addItem);

itemRouter.patch(
  "/edit/:itemId",
  upload.single("image"),
  authenticate,
  editItem,
);

export default itemRouter;
