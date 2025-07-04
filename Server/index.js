import express from "express";
import connectDb from "./db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

connectDb();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mutual-fund-tracker-nu.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin"));
      }
    },
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
