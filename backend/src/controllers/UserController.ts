import { NextFunction,Request,Response } from "express";
import { UserService } from "../services";

class UserController{
    
    async signup(req: Request, res: Response, next: NextFunction){

        const studentData = req.body;
        try{
            const newUser = await UserService.signup(studentData);
            res.status(200).json(newUser);
        }catch(error){
            next(error);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction){

        const userData = req.body;
        try{
            const user = await UserService.signin(userData);
            res.status(200).json(user);
        }catch(error){
            next(error);
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction){
        
        const userData = req.body;
        try{
            const updatedUser = await UserService.updatePassword(userData);
            res.status(200).json(updatedUser);
        }catch(error){
            next(error);
        }
    }

    async removeUser(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await UserService.removeUser(req.params.userId);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }
}

export default new UserController();