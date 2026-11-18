

import express, { Application, Request, Response } from "express"   
const app : Application = express()
const port = 5000;
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
app.post("/", async(req : Request, res : Response)=>{
    console.log(req.body);
});
app.listen(port, () => {
  console.log(`The express server is running on port ${port}`)
})