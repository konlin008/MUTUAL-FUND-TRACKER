import jwt from "jsonwebtoken";
const generateToken = (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  if (token) {
    res
      .status(202)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: `welcome ${user.firstname}`, user, success: true });
  }
};

export default generateToken;
