import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../constants/routes";
import axiosInstance from "../lib/axios";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    console.log("called");
    try {
      let response = await axiosInstance.post(AUTH_ROUTES.REGISTER, {
        fullName,
        email,
        password,
        mobile,
        role,
      });
      console.log(response);
      toast.success(response.data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-gray-50 via-yellow-50 to-amber-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 md:p-8 border border-gray-100">
        {/* Brand Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">OrderKaro</h1>
          <p className="text-gray-600 text-sm">
            Sign up for delicious food delivery
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Mobile Number
          </label>
          <div className="flex">
            <div className="w-20 border border-gray-300 border-r-0 rounded-l-lg px-3 py-3 bg-amber-50 flex items-center justify-center text-gray-600 text-sm">
              +91
            </div>
            <input
              type="tel"
              className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              maxLength={10}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm pr-12 bg-white"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Role Selection - Desktop (Grid) */}
        <div className="mb-8 hidden sm:block">
          <label className="block text-gray-700 font-medium mb-3 text-sm">
            Sign up as
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className={`py-3 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer ${
                  role === r
                    ? "bg-orange-500 text-white"
                    : "border border-orange-500 text-orange-500 hover:bg-amber-50"
                }`}
                onClick={() => setRole(r)}
                type="button"
              >
                {r === "user" ? "Foodie" : r === "owner" ? "Partner" : "Rider"}
              </button>
            ))}
          </div>
        </div>

        {/* Role Selection - Mobile (Select) */}
        <div className="mb-8 sm:hidden">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Sign up as
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Foodie</option>
            <option value="owner">Restaurant Partner</option>
            <option value="deliveryBoy">Delivery Partner</option>
          </select>
        </div>

        {/* Sign Up Button */}
        <button
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm mb-4 hover:cursor-pointer"
          onClick={handleRegister}
        >
          {loading ? "Loading..." : "Sign Up"}
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
        <button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-amber-50 transition-colors text-sm font-medium mb-6 bg-white hover:cursor-pointer">
          <FcGoogle size={18} />
          <span>Continue with Google</span>
        </button>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-orange-500 font-medium hover:text-orange-600 hover:cursor-pointer transition-colors "
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By creating an account, I accept the Terms & Conditions
        </p>
      </div>
    </div>
  );
}

export default SignUp;
