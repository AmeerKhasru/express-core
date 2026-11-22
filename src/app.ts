

import express, { Application, Request, Response } from "express"
import {Pool} from "pg"   
import config from "./config";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";
const app : Application = express()

app.use(express.json());


app.get('/', (req : Request, res : Response) => {
    console.log(req);
//   res.send('This is root Route')
res.status(200).json({
    success : true,
    message :"this is root route",
    author: "Khasru",
});
})

app.use("/api/v1/users",userRoute)




export default app;