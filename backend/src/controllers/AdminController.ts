import { NextFunction, Request, Response } from "express";
import adminService from "../services/AdminService";

class AdminController{
    async createAdmin(req: Request, res: Response, next: NextFunction){
        const adminData = req.body;
        try{
            const newAdmin = await adminService.create(adminData);
            res.status(200).json(newAdmin);
        }catch(error){
            next(error);
        }
    }
    async getAdminById(req: Request, res: Response, next: NextFunction){
        try{
            const adminReponse = await adminService.getById(req.params.id);
            res.status(200).json(adminReponse);
        }catch(error){
            next(error);
        }
    }
    async updateAdminById(req: Request, res: Response, next: NextFunction){
        const adminData = req.body;
        try{
            const adminReponse = await adminService.updateById(req.params.id,adminData);
            res.status(200).json(adminReponse);
        }catch(error){
            next(error);
        }
    }
    async deleteAdminById(req: Request, res: Response, next: NextFunction){
        try{
            const adminReponse = await adminService.deleteById(req.params.id);
            res.status(200).json(adminReponse);
        }catch(error){
            next(error);
        }
    }
}

export default new AdminController();