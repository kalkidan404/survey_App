
import express from "express";
import { getDashboard } from "../controller/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/", authMiddleware, getDashboard);

export { route };
