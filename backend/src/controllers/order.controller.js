import ShopModel from "../models/Shop.model.js";
import ErrorResponse from "../utils/ApiError.util.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;

    const groupItemsByShop = {};

    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    const shopOrders = Object.keys(groupItemsByShop).map(async (shopId) => {
      const shop = await ShopModel.findById(shopId).populate("owner");

      if (!shop) {
        return next(new ErrorResponse(`Shop with id ${shopId} not found`, 404));
      }
      const items = groupItemsByShop[shopId];
      const subTotal = items.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      );
    });
  } catch (error) {
    next(error);
  }
};

// let groupItemsByShop = {
//   dominoesId: [itemId1, itemId2, item2],
//   pizzaHutId: [itemId3],
// };
