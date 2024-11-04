import { Request,Response,NextFunction } from "express";
import { ComplaintService } from "../services/index";
class Complaintcontroller{
    
    async createComplaint(req: Request, res: Response, next: NextFunction){

        const complaintData = req.body;
        try{
            const newComplaint = await ComplaintService.create(complaintData);
            res.status(200).json(newComplaint);
        }catch(error){
            next(error);
        }
    }

    async getComplaintById(req: Request, res: Response, next: NextFunction){

        try{
            const complaint = await ComplaintService.getById(req.params.ID);
            res.status(200).json(complaint);
        }catch(error){
            next(error);
        }
    }

    async updateComplaintById(req: Request, res: Response, next: NextFunction){
        
        const complaintData = req.body;
        try{
            const updatedComplaint = await ComplaintService.updateById(req.params.ID,complaintData);
            res.status(200).json(updatedComplaint);
        }catch(error){
            next(error);
        }
    }

    async deleteComplaintById(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await ComplaintService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await ComplaintService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

}

export default new Complaintcontroller();