import { Request, Response } from "express";
import { userRoute } from "./user.route";
import { userService } from "./user.service";
import { pool } from "../../db";

const createUser = async(req : Request, res : Response)=>{
    try {
        const result = await userService.createUserIntoDB(req.body)
   
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
};

const getAllUsers = async(req : Request, res : Response)=>{
    try {
            const result = await userService.getAlluserFromDB();

            if (result.rowCount===0){
            return res.status(404).json({
            success : true,
            message :"  User Not found!!",
            });
        }

            res.status(200).json({
            success : true,
            message :"  User Retrieved Successfully!!",
             data: result.rows
    
});
            // console.log(result);
    } catch (error: any) {
        res.status(500).json({
        success : false,
        message : error?.message,
        error : error
    
    
        });
    }
}

const getSingleUser = async(req : Request, res : Response)=>{
    try {
        
        const {id} = req.params;
        const result = await userService.getSingleUserFromDB(id as string);
         if (result.rowCount===0){
                return res.status(404).json({
            success : false,
            message :"  User Not Found!!",
            });
            }

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
}

const updateSingleUser =  async(req : Request, res : Response)=>{
    try {
        const {id} = req.params;
        const result = await userService.updateSingleUserIntoDB(req.body, id as string);
        if (result.rowCount===0){
            return res.status(404).json({
            success : false,
            message :"  User Not Found!!",
            });
        }

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
}

const deleteSingleUser = async(req : Request, res : Response)=>{
    try {
        const {id} = req.params;
        const result = await userService.deleteSingleUserFromDB(id as string);

        if (result.rowCount===0){
            return res.status(404).json({
            success : false,
            message :"  User not Found!!",
            });
        }

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
}

export const userController = {
    createUser, 
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}