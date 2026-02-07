import ShopModel from "../models/Shop.model.js";
import {
  getDataURLFromFile,
  uploadToCloudinary,
} from "../utils/cloudinary.util.js";

export const createShop = async (req, res, next) => {
  try {
    let userId = req.user._id;
    const { name, city, address, state } = req.body;
    let image;
    if (req.file) {
      let dataURL = getDataURLFromFile(req.file);
      image = uploadToCloudinary(dataURL, next);
    }
    const newShop = await ShopModel.create({
      name,
      city,
      address,
      state,
      image,
      owner: userId,
    });

    res.status(201).json({
      success: true,
      message: "Shop created successfully",
      shop: newShop,
    });
  } catch (error) {
    next(error);
  }
};

export const editShop = async (req, res, next) => {
  try {
    let shopId = req.params.shopId;
    let userId = req.user._id;
    const { name, city, address, state } = req.body;
    let image;
    if (req.file) {
      let dataURL = getDataURLFromFile(req.file);
      image = uploadToCloudinary(dataURL, next);
    }
    const updatedShop = await ShopModel.findByIdAndUpdate(
      shopId,
      {
        name,
        city,
        address,
        state,
        image,
      },
      { new: true },
    ).populate({
      path: "owner",
      select: "fullName email mobile ",
    });
    res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      shop: updatedShop,
    });
  } catch (error) {
    next(error);
  }
};
