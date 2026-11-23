import { pool } from "../../db";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payLoad : IUser)=>{
// console.log(req.body);
        const {name , email, age, password} = payLoad;
        const hashPassword = await bcrypt.hash(password,10);
        const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES
        ($1,$2,$3,$4) RETURNING *
        `,
        [name,email,age,hashPassword],
    );
    delete result.rows[0].password;
    return result;

}

const getAlluserFromDB = async()=> {
    const result = await pool.query(`
            SELECT * FROM users
            `)
            return result;
}

const getSingleUserFromDB = async ( id : string)=> {
        const result = await pool.query(`
            SELECT * FROM users
            WHERE id = $1;
            `,
            [id],
        );
        return result;
}

const updateSingleUserIntoDB = async (payLoad : IUser, id : string)=> {
    const {name,age, password, is_Active} = payLoad;
    

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

        return result;
}

const deleteSingleUserFromDB = async (id : string)=> {
    const result = await pool.query(`
            DELETE FROM users
            WHERE id = $1;
            `,
            [id]
        );
        return result;
}
export const userService = {
    createUserIntoDB,
    getAlluserFromDB,
    getSingleUserFromDB,
    updateSingleUserIntoDB, 
    deleteSingleUserFromDB
}