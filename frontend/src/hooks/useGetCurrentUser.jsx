import axios from "axios";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import { USER_ROUTES } from "../constants/routes";
import { setUserData } from "../redux/slices/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(USER_ROUTES.CURRENT_USER);
        console.log("result: ", result);
        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchUser();
  }, []);
}

export default useGetCurrentUser;
