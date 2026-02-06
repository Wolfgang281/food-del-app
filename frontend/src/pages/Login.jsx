import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../constants/routes";
import axiosInstance from "../lib/axios";
// import axios from "axios"
// import { serverUrl } from '../App';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { ClipLoader } from 'react-spinners';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';

function SignIn() {
  // const primaryColor = "#ff4d2d";
  // const hoverColor = "#e64323";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.post(AUTH_ROUTES.LOGIN, {
        email,
        password,
      });
      console.log("result: ", result);
      toast.success(result.data.message);
      // dispatch(setUserData(result.data));
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // const handleGoogleAuth = async () => {
  //     const provider = new GoogleAuthProvider()
  //     const result = await signInWithPopup(auth, provider)
  //     try {
  //         const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
  //             email: result.user.email,
  //         }, { withCredentials: true })
  //         dispatch(setUserData(data))
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-gray-50 via-yellow-50 to-amber-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 md:p-8 border border-gray-100">
        {/* Brand Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">OrderKaro</h1>
          <p className="text-gray-600 text-sm">
            Sign in to your account for delicious food delivery
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm pr-12 bg-white"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              {!showPassword ? (
                <FaRegEye size={18} className="hover:cursor-pointer" />
              ) : (
                <FaRegEyeSlash size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button
            className="text-orange-500 font-medium hover:text-orange-600 text-sm hover:cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm mb-4 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="ml-2">Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          className="w-full border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-amber-50 transition-colors text-sm font-medium mb-6 bg-white hover:cursor-pointer"
          // onClick={handleGoogleAuth}
        >
          <FcGoogle size={18} />
          <span>Sign in with Google</span>
        </button>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-600">
          Want to create a new account?{" "}
          <button
            className="text-orange-500 font-medium hover:text-orange-600 hover:cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}

export default SignIn;
