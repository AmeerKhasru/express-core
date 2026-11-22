import { pool } from "../../db";
import { IUser } from "./user.interface";

const createUserIntoDB = async (payLoad : IUser)=>{
// console.log(req.body);
        const {name , email, age, password} = payLoad;
        const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES
        ($1,$2,$3,$4) RETURNING *
        `,
        [name,email,age,password],
    );
    return result;
}

export const userService = {
    createUserIntoDB,
}