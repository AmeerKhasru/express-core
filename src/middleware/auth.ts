import { NextFunction, Request, Response } from "express";

const auth = (req: Request ,res : Response , next : NextFunction)=>{

    // 1. chk if the token exist
    // console.log("protected");
    // console.log("[AUTH MIDDLEWARE HIT]", req.method, req.originalUrl);
    // console.log(req.headers.authorization);

    const token = req.headers.authorization;
    if (!token){
         res.status(401).json({
        success : false,
        message : "Unauthorised Access!",
       
    
        }); 
    }
    next();
}
export default auth;