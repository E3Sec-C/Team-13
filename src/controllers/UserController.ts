import { NextFunction,Request,Response } from "express";
import { UserService } from "../services";
import { asyncHandler } from "../middlewares/asyncHandler";

class UserController{
    
    signup = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const newUser = await UserService.signup(req.body);
        res.status(200).json(newUser);
    });

    signin = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const user = await UserService.signin(req.body);
        res.status(200).json(user);
    });
    
    updatePassword = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const updatedUser = await UserService.updatePassword(req.body);
        res.status(200).json(updatedUser);
    });

    removeUser = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await UserService.removeUser(req.params.userId);
        res.status(200).json(response);
    });

}

export default new UserController();