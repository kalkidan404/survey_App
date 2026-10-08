import express from "express"
const route=express.Router()
import  {
  addAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controller/answerController.js"
route.post("/", addAnswer)
route.get("/:id", getAnswer)
route.put("/:id", updateAnswer)
route.delete("/:id", deleteAnswer)
export{route}