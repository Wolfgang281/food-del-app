import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLoader } from "./components/AuthLoader";
import useGetCity from "./hooks/useGetCity";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetMyShop from "./hooks/useGetMyShop";
import AddItem from "./pages/AddItem";
import CreateAndEditShop from "./pages/CreateAndEditShop";
import EditItem from "./pages/EditItem";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SSOCallback from "./pages/SSOCallback";

const App = () => {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();

  const { userData, loading } = useSelector((state) => state.user);

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <Routes>
      <Route
        path="/register"
        element={!userData ? <Register /> : <Navigate to={"/"} />}
      />

      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to={"/"} />}
      />

      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />

      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route path="/sso-callback" element={<SSOCallback />} />

      <Route
        path="/create-edit-shop"
        element={userData ? <CreateAndEditShop /> : <Navigate to={"/login"} />}
      />

      <Route
        path="/add-item"
        element={userData ? <AddItem /> : <Navigate to={"/login"} />}
      />

      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
};

export default App;
