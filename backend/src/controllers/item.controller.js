import ItemModel from "../models/Item.model.js";
import ShopModel from "../models/Shop.model.js";
import ErrorResponse from "../utils/ApiError.util.js";
import {
  getDataURLFromFile,
  uploadToCloudinary,
} from "../utils/cloudinary.util.js";

export const addItem = async (req, res, next) => {
  try {
    let { name, foodType, price, category } = req.body;
    let shopId = req.params.shopId;
    let userId = req.user._id;
    let image;

    let shop = await ShopModel.findById(shopId);
    if (!shop)
      return next(new ErrorResponse(`Shop with ID ${shopId} not found`, 404));

    if (req.file) {
      let dataURL = getDataURLFromFile(req.file);
      image = await uploadToCloudinary(dataURL, next);
    }

    const newItem = await ItemModel.create({
      name,
      foodType,
      price,
      category,
      image,
      shop: shopId,
      addedBy: userId,
    });

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

export const editItem = async (req, res, next) => {
  try {
    let { name, foodType, price, category } = req.body;
    let itemId = req.params.itemId;
    let image;

    if (req.file) {
      let dataURL = getDataURLFromFile(req.file);
      image = await uploadToCloudinary(dataURL, next);
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      {
        name,
        foodType,
        price,
        category,
        image,
      },
      { new: true },
    );

    if (!updatedItem) {
      return next(new ErrorResponse(`Item with ID ${itemId} not found`, 404));
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};
