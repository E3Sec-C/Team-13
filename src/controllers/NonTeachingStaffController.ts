import { Request,Response,NextFunction } from "express";
import { NonTeachingStaffService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class NonTeachingStaffcontroller{
    
    createNonTeachingStaff = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const newNonTeachingStaff = await NonTeachingStaffService.create(req.body);
        res.status(200).json(newNonTeachingStaff);
    });

    getNonTeachingStaffById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const nonTeachingStaff = await NonTeachingStaffService.getById(req.params.ID);
        res.status(200).json(nonTeachingStaff);
    });

    updateNonTeachingStaffById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const updatedNonTeachingStaff = await NonTeachingStaffService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedNonTeachingStaff);
    });

    deleteNonTeachingStaffById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await NonTeachingStaffService.deleteById(req.params.ID);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await NonTeachingStaffService.getAll();
        res.status(200).json(response);
    });

}

export default new NonTeachingStaffcontroller();