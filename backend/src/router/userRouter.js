import express from "express";
const route=express.Router();
import {register,getme,login,logout} from "../controller/userController.js"
route.post("/register", register);
route.get("/me", getme);
route.post("/login", login);
route.post("/logout", logout);
export{route}