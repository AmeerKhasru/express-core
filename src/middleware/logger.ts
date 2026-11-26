import { NextFunction, Request, Response } from "express";
import fs from "fs"


const logger = ((req : Request, res :Response , next : NextFunction) => {
//   console.log("Method -> URL -> Time : ", req.method, req.url, Date.now());
    const log = `\n method :${req.method} | URL : ${req.url} | Date : ${Date.now()} \n`;
    fs.appendFile("logger.log", log, (err) => {
  if (err) {
    console.error("Failed to write log:", err);
  }
});
    

  next();
});
export default logger