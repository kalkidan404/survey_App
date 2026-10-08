import express from "express";
const route=express.Router();
import {register,getme,login,logout} from "../controller/userController.js"