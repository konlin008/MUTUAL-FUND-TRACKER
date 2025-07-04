import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(400).json({ message: "Unauthorized", success: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unauthorized Token or Expired",
      success: false,
    });
  }
};
export default isAuthenticated;
