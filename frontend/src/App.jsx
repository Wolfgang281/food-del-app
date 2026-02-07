import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  useGetCurrentUser();

  const { userData, loading } = useSelector((state) => state.user);
  console.log("userData: ", userData);

  if (loading) {
    return <div>Checking auth...</div>;
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
    </Routes>
  );
};

export default App;
