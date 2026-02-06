import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

import { toast } from "sonner";
import { AUTH_ROUTES } from "../constants/routes";
import axiosInstance from "../lib/axios";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.post(AUTH_ROUTES.SEND_OTP, { email });
      console.log(result);
      toast.success("OTP sent successfully");
      setStep(2);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.post(AUTH_ROUTES.VERIFY_OTP, {
        email,
        otp,
      });
      console.log(result);
      setStep(3);
      setLoading(false);
      toast.success("OTP verified successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    setLoading(true);
    try {
      const result = await axiosInstance.post(AUTH_ROUTES.RESET_PASSWORD, {
        email,
        password: newPassword,
      });
      toast.success("Password reset successfully");
      console.log(result);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data?.message);
      //   console.log(error?.response?.data?.errLine);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-gray-50 via-yellow-50 to-amber-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="mb-8">
          <button
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-4 transition-colors hover:cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            <IoIosArrowRoundBack size={24} />
            <span className="font-medium">Back to Login</span>
          </button>
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-orange-500">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              {step === 1
                ? "Enter your email to receive OTP"
                : step === 2
                  ? "Enter the OTP sent to your email"
                  : "Create a new password for your account"}
            </p>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
            <div
              className="absolute top-3 left-0 h-0.5 bg-orange-500 -z-10 transition-all duration-300"
              style={{
                width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
              }}
            ></div>

            {/* Steps */}
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium
                  ${step >= stepNumber ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {stepNumber === 1
                    ? "Email"
                    : stepNumber === 2
                      ? "OTP"
                      : "Password"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
                placeholder="Enter your registered email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <button
              className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm hover:cursor-pointer`}
              onClick={handleSendOtp}
              disabled={loading}
            >
              <span className="flex items-center justify-center">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </span>
            </button>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Enter OTP
              </label>
              <p className="text-gray-500 text-xs mb-3">
                We've sent a 6-digit OTP to {email}
              </p>
              <input
                type="text"
                maxLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-center text-lg tracking-widest font-medium bg-white"
                placeholder="_ _ _ _ _ _"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
              <div className="flex justify-between mt-3 text-xs">
                <button className="text-orange-500 hover:text-orange-600 font-medium">
                  Resend OTP
                </button>
                <button
                  className="text-orange-500 hover:text-orange-600 font-medium"
                  onClick={() => setStep(1)}
                >
                  Change Email
                </button>
              </div>
            </div>

            <button
              className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm`}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying OTP...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
              <p className="text-gray-400 text-xs mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-sm bg-white"
                placeholder="Re-enter new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>

            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

            <button
              className={`w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm`}
              onClick={handleResetPassword}
              disabled={loading || newPassword !== confirmPassword}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500">
            Need help? Contact our support team at support@orderkaro.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
