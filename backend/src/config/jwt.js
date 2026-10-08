import jwt from "jsonwebtoken";
const JWT_SECRET=process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not available in env")
}
const generateToken=(payload)=>{
    return jwt.sign(payload, JWT_SECRET,{
        expiresIn:"7d"
    });
}
const verifyToken=(Token)=>{
    return jwt.verify(Token, JWT_SECRET)
}
export{generateToken,verifyToken}