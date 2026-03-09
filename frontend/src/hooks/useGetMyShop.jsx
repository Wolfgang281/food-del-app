import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOP_ROUTES } from "../constants/endpoints";
import axiosInstance from "../lib/axios";
import { setShopData } from "../redux/slices/ownerSlice";

function useGetMyShop() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axiosInstance.get(SHOP_ROUTES.GET_MY_SHOP);
        // console.log("result: ", result);
        dispatch(setShopData(result.data.shop));
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShop();
  }, [dispatch, userData]);
}

export default useGetMyShop;
