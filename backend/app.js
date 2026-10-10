import express from "express";
import cookieParser from "cookie-parser";

import { route as userRoutes } from "./routes/userRoutes.js";
import { route as surveyRoutes } from "./routes/surveyRoutes.js";
import { route as questionRoutes } from "./routes/questionRoutes.js";
import { route as optionRoutes } from "./routes/optionRoutes.js";
import { route as responseRoutes } from "./routes/responseRoutes.js";
import { route as answerRoutes } from "./routes/answerRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
import { route as surveyRoutes } from "./routes/surveyRoutes.js";
import { route as dashboardRoutes } from "./routes/dashboardRoutes.js";

app.use("/surveys", surveyRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);
app.use("/surveys", surveyRoutes);
app.use("/questions", questionRoutes);
app.use("/options", optionRoutes);
app.use("/responses", responseRoutes);
app.use("/answers", answerRoutes);

app.use(errorMiddleware);

export default app;