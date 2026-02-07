import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_ROUTES } from "../constants/routes";
import axiosInstance from "../lib/axios";
import { clearUser, setUserData } from "../redux/slices/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(USER_ROUTES.CURRENT_USER);
        dispatch(setUserData(res.data.user));
      } catch (err) {
        console.log("err: ", err);
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
