import UserModel from "../models/User.model.js";
import ErrorResponse from "../utils/ApiError.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res, next) => {
  const { fullName, email, password, mobile, role } = req.body;
  try {
    const user = await UserModel.create({
      fullName,
      email,
      password,
      mobile,
      role,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

    const token = generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      secure: false,
      sameSite: "strict",
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
