import { NextFunction, Request, Response } from "express";
import {AdminService} from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";

class AdminController{

    createAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const adminData = req.body;
        const newAdmin = await AdminService.create(adminData);
        res.status(200).json(newAdmin);
    });

    getAdminById = asyncHandler(async(req: Request,res: Response,next:NextFunction)=>{
        console.log(req.params.ID);
        const adminResponse = await AdminService.getById(req.params.ID);
        res.status(200).json(adminResponse);
    });

    updateAdminById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const adminReponse = await AdminService.updateById(req.params.ID,req.body);
        res.status(200).json(adminReponse);
    });

    deleteAdminById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const adminReponse = await AdminService.deleteById(req.params.ID);
        res.status(200).json(adminReponse);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await AdminService.getAll();
        res.status(200).json(response);
    });
    
}

export default new AdminController();