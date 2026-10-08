//register, getme,login,logout
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
const register=async (req,res,next)=>{
    try{
    const {email, password} =req.body;
   const hashedPassword=await bcrypt.hash(password, 10)
   const user= await prisma.user.create({
    data:{
        email:email,
        password:hashedPassword,
    }
   })
   return res.status(201).json({message:"user created"})
}catch(error){
    next(error);
}
}
const getme= async(req,res,next)=>{
    try{
        
        const me=prisma.user.findUnique({
            where:{
                id:req.user.id
            },
        })   
        return res.status(200).json({me})
     }catch(error){
        next(error)
     }
}
const login=async(req,res,next)=>{
    try{
    const {email, password}=req.body;
    const user=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    const isPasswordcorrect=await bcrypt.compare(password, user.password)
    return res.status(200).json({message:"login succeful"})
    }catch(error){
        next(error)
    }
}
const logout=async(req,res,next)=>{
    try{
        return res.status(200).json({message:"logout successful"})
    }catch(error){
        next(error)
    }
}
export{register,getme,login,logout}