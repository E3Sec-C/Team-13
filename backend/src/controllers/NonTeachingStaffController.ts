import { Request,Response,NextFunction } from "express";
import { NonTeachingStaffService } from "../services/index";
class NonTeachingStaffcontroller{
    
    async createNonTeachingStaff(req: Request, res: Response, next: NextFunction){

        const nonTeachingStaffData = req.body;
        try{
            const newNonTeachingStaff = await NonTeachingStaffService.create(nonTeachingStaffData);
            res.status(200).json(newNonTeachingStaff);
        }catch(error){
            next(error);
        }
    }

    async getNonTeachingStaffById(req: Request, res: Response, next: NextFunction){

        try{
            const nonTeachingStaff = await NonTeachingStaffService.getById(req.params.ID);
            res.status(200).json(nonTeachingStaff);
        }catch(error){
            next(error);
        }
    }

    async updateNonTeachingStaffById(req: Request, res: Response, next: NextFunction){
        
        const nonTeachingStaffData = req.body;
        try{
            const updatedNonTeachingStaff = await NonTeachingStaffService.updateById(req.params.ID,nonTeachingStaffData);
            res.status(200).json(updatedNonTeachingStaff);
        }catch(error){
            next(error);
        }
    }

    async deleteNonTeachingStaffById(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await NonTeachingStaffService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await NonTeachingStaffService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }
}

export default new NonTeachingStaffcontroller();