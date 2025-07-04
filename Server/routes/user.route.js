import express from "express";
import { getSavedFunds, saveFunds } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/saveFund", isAuthenticated, saveFunds);
router.get("/savedFunds", isAuthenticated, getSavedFunds);

export default router;
