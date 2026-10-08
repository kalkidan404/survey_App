import express from "express"
const route=express.Router();
import {
  createResponse,
  getMyResponses,
  getResponseById,
  deleteResponse,
} from "../controller/responseController.js"
route.post("/", createResponse);

route.get("/", getMyResponses);

route.get("/:id", getResponseById);

route.delete("/:id", deleteResponse);
export{route};