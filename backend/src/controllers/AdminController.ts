import { NextFunction, Request, Response } from "express";
import {AdminService} from "../services/index";

class AdminController{

    async createAdmin(req: Request, res: Response, next: NextFunction){

        const adminData = req.body;
        try{
            const newAdmin = await AdminService.create(adminData);
            res.status(200).json(newAdmin);
        }catch(error){
            next(error);
        }
    }

    async getAdminById(req: Request, res: Response, next: NextFunction){

        try{
            const adminReponse = await AdminService.getById(req.params.ID);
            res.status(200).json(adminReponse);
        }catch(error){
            next(error);
        }
    }

    async updateAdminById(req: Request, res: Response, next: NextFunction){

        const adminData = req.body;
        try{
            const adminReponse = await AdminService.updateById(req.params.ID,adminData);
            res.status(200).json(adminReponse);
        }catch(error){
            next(error);
        }
    }

    async deleteAdminById(req: Request, res: Response, next: NextFunction){

        try{
            const adminReponse = await AdminService.deleteById(req.params.ID);
            res.status(200).json(adminReponse);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await AdminService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

}

export default new AdminController();