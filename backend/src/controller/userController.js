//register, getme,login,logout
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { use } from "react";
const register=async (req,res,next)=>{
    try{
    const {username, password} =req.body;
   const hashedPassword=await bcrypt.hash(passwprd, 10)
   const user= await prisma.User.create({
    data:{
        username:username,
        password:hashedPassword,
    }
   })
   return res.status(201).json({message:"user created"})
}catch(error){
    next(error);
}
}