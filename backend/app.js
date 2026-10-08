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

app.use("/api/users", userRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/options", optionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/answers", answerRoutes);

app.use(errorMiddleware);

export default app;