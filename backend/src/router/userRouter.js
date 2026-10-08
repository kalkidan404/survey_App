import express from "express";
const route=express.Router();
import {register,getme,login,logout} from "../controller/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/ValidationMiddleware.js";
route.post("/register",validate, register);
route.get("/me",authMiddleware, getme);
route.post("/login",validate, login);
route.post("/logout",authMiddleware, logout);
export{route}