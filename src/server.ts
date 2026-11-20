

import express, { Application, Request, Response } from "express"
import {Pool} from "pg"   
const app : Application = express()
const port = 5000;
app.use(express.json());

const pool =new Pool({
    connectionString : "ppostgresql://neondb_owner:npg_pqNiWRyBEw21@ep-old-water-be928wr5.c-9.us-east-2.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
});
// console.log(pool);
const initDB = async () => {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_Active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            

        `)
        console.log("Database Connected");

    } catch(error){
        console.log(error);
    }
};
initDB();

app.get('/', (req : Request, res : Response) => {
    console.log(req);
//   res.send('This is root Route')
res.status(200).json({
    success : true,
    message :"this is root route",
    author: "Khasru",
});
})
app.post("/api/v1/users", async(req : Request, res : Response)=>{
    try {
        // console.log(req.body);
    const {name , email, age, password} = req.body;
    const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES
        ($1,$2,$3,$4) RETURNING *
        `,
        [name,email,age,password],
    );
    res.status(201).json({
    success : true,
    message :"  User Created!!",
    data: result.rows[0],
    
});
    } catch (error : any) {
        res.status(500).json({
        success : false,
        message : error?.message,
        error : error
    
    
        });
    }
});

app.get("/api/v1/users", async(req : Request, res : Response)=>{
    try {
        const result = await pool.query(`
            SELECT * FROM users
            `)
            res.status(200).json({
            success : true,
            message :"  User Retrieved Successfully!!",
             data: result.rows
    
});
            console.log(result);
    } catch (error: any) {
        res.status(500).json({
        success : false,
        message : error?.message,
        error : error
    
    
        });
    }
});
app.get("/api/v1/users/:id", async(req : Request, res : Response)=>{
    try {
        const {id} = req.params;
        const result = await pool.query(`
            SELECT * FROM users
            WHERE id = $1;
            `,
            [id],
        );

        res.status(200).json({
            success : true,
            message :"  User Retrieved Successfully!!",
             data: result.rows[0]
    
          });
    } catch (error: any) {
        res.status(500).json({
        success : false,
        message : error?.message,
        error : error
    
    
        });
    }
});
app.put("/api/v1/users/:id", async(req : Request, res : Response)=>{
    try {
        const {id} = req.params;
        const {name,age, password, is_Active} = req.body;
        const result = await pool.query(`
            UPDATE users
            SET 
            name = COALESCE ($1, name),
            password = COALESCE ($2, password),
            age = COALESCE ($3, age),
            is_Active = COALESCE ($4, is_Active),
            updated_at = NOW()
            WHERE id=$5 RETURNING *
            `,
            [name ?? null, password ?? null, age ?? null, is_Active ?? null, id]
        );
        console.log(result);
        res.status(200).json({
            success : true,
            message :"  User updated Successfully!!",
             data: result.rows[0]
    
          });
    } catch (error: any) {
        res.status(500).json({
        success : false,
        message : error?.message,
        error : error
    
    
        });
    }
});

app.delete("/api/v1/users/:id", async(req : Request, res : Response)=>{
    try {
        const {id} = req.params;
        const result = await pool.query(`
            DELETE FROM users
            WHERE id = $1;
            `,
            [id]
        );

        res.status(200).json({
            success : true,
            message :"  User Deleted Successfully!!",
            //  data: result.rows[0]
    
          });
    } catch (error: any) {
        res.status(500).json({
        success : false,
        message : error?.message,
        error : error
    
    
        });
    }
});
app.listen(port, () => {
  console.log(`The express server is running on port ${port}`)
})