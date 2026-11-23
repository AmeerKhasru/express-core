import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";


const loginUserIntoDB = async (payload: {email:string; password:string})=>{
    //chck if the user exist-done
    //chck password match-done
    //chck user status-done
    //if all condition pass then generate jwt token

    const {email, password} = payload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email]
    );
    // console.log(user.rows[0]);

    if(user.rowCount === 0 ){
        throw new Error("Invalid credentials!")
    }
    const matchPassword = await bcrypt.compare(password,user.rows[0].password);
    if(!matchPassword ){
        throw new Error("Invalid credentials!")
    }
    if(!user.rows[0].is_active){
        throw new Error("Access denied!")
    }

    const jwtPayLoad = {
        id : user.rows[0].id,
        name : user.rows[0].name,
        email : user.rows[0].email,
    }
    const accessToken = jwt.sign(jwtPayLoad,"sdafrrgasdf",{
        expiresIn:"1d"
    });
    return {accessToken, user : user.rows[0]};

}

export const authService ={
    loginUserIntoDB,
}