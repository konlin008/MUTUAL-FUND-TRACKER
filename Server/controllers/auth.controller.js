import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { json } from "express";

const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;
    if (!username || !firstname || !lastname || !password)
      return res.status(400).json({
        message: "All Fields are Required",
        success: false,
      });
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ message: "User Already Exists", success: false });
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });
    if (newUser)
      return res.status(200).json({
        message: "User Registered Successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Faild To Register! Internal Server Error",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        message: "All Fields are Required",
        success: false,
      });
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    const { password: pwd, ...userData } = user._doc;
    if (!isCorrectPassword)
      return res
        .status(400)
        .json({ message: "Wrong Username or Password", success: false });
    generateToken(res, userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Faild To Register! Internal Server Error",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    return res
      .status(200)
      .json({ message: "Logged Out Successfully", success: true });
  } catch (error) {
    console.error(error);
    return (
      res.status(500),
      json({
        message: "Faild To Logout! Internal Server Error",
      })
    );
  }
};
