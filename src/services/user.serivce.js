require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../helpers/responseHandle");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const generateTokenPair = ({ userId, role, email }) => {
  if (!userId || !role || !email)
    throw new ErrorResponse({ message: "all fields are required!" });

  const payload = {
    userId,
    role,
    email,
  };
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const login = async ({ email, password }) => {
  if (!email || !password)
    throw new ErrorResponse({ message: "all fields are required" });

  const user = await UserModel.findOne({ email }).lean();
  if (!user) throw new ErrorResponse({ message: "email or password wrong" });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    throw new ErrorResponse({ message: "email or password wrong" });

  const token = generateTokenPair({
    userId: user._id,
    role: user.role,
    email: user.email,
  });

  return {
    userId: user._id,
    email: user.email,
    fullname: user.fullname,
    token,
  };
};

const register = async ({ email, fullname, password }) => {
  if (!email || !fullname || !password)
    throw new ErrorResponse({ message: "all fields are required" });

  const existUser = await UserModel.findOne({ email });
  if (existUser) throw new ErrorResponse({ message: "email already registed" });

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    fullname,
    password: hashPassword,
  });

  return {
    userId: user._id,
    email: user.email,
    fullname: user.fullname,
  };
};

module.exports = {
  generateTokenPair,
  login,
  register,
};
