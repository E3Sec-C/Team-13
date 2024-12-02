import { Request,Response,NextFunction } from "express";
import { ComplaintService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class Complaintcontroller{
    
    createComplaint = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const newComplaint = await ComplaintService.create(req.body);
        res.status(200).json(newComplaint);
    });

    getComplaintById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const complaint = await ComplaintService.getById(req.params.ID);
        res.status(200).json(complaint);
    });

    updateComplaintById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const updatedComplaint = await ComplaintService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedComplaint);
    });

    deleteComplaintById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await ComplaintService.deleteById(req.params.ID);
            res.status(200).json(response);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await ComplaintService.getAll();
        res.status(200).json(response);
    });

}

export default new Complaintcontroller();