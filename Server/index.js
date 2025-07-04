import express from "express";
import connectDb from "./db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});
