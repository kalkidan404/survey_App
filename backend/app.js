import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { route as userRoutes } from "./src/router/userRouter.js";
import { route as surveyRoutes } from "./src/router/surveyRouter.js";
import { route as questionRoutes } from "./src/router/questionRouter.js";
import { route as optionRoutes } from "./src/router/optionRouter.js";
import { route as responseRoutes } from "./src/router/responseRouter.js";
import { route as answerRoutes } from "./src/router/answerRouter.js";
import { route as dashboardRoutes } from "./src/router/dashboardRouter.js";

import errorMiddleware from "./src/middleware/errorMiddleware.js";

const app = express();

app.use(
cors({
origin: "http://localhost:5173",
credentials: true,
})
);

app.use(express.json());
app.use(cookieParser());

app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);
app.use("/surveys", surveyRoutes);
app.use("/questions", questionRoutes);
app.use("/options", optionRoutes);
app.use("/responses", responseRoutes);
app.use("/answers", answerRoutes);

app.use(errorMiddleware);

export default app;
