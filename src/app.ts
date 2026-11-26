

import express, { Application, Request, Response } from "express"
import {Pool} from "pg"   
import config from "./config";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
const app : Application = express()
import fs from "fs"

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
//   console.log("Method -> URL -> Time : ", req.method, req.url, Date.now());
    const log = `\n method :${req.method} | URL : ${req.url} | Date : ${Date.now()} \n`;
    fs.appendFile("logger.tx", log,(err)=>{
        console.log(err);
    });

  next();
});

app.use("/api/v1/users",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/auth",authRoute);

app.get('/', (req : Request, res : Response) => {
//   res.send('This is root Route')
res.status(200).json({
    success : true,
    message :"this is root route",
    author: "Khasru",
});
})


export default app;