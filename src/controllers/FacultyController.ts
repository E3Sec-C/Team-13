import { asyncHandler } from "../middlewares/asyncHandler";
import { FacultyService } from "../services/index";
import { Request,Response,NextFunction } from "express";

class FacultyController{

    createFaculty = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const newFaculty = await FacultyService.create(req.body);
        res.status(200).json(newFaculty);
    });

    getFacultyById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const faculty = await FacultyService.getById(req.params.ID);
        res.status(200).json(faculty);
    });

    updateFacultyById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const updatedFaculty = await FacultyService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedFaculty);
    });

    deleteFacultyById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await FacultyService.deleteById(req.params.ID);
        res.status(200).json(response);
    });
    
    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await FacultyService.getAll();
        res.status(200).json(response);
    });

}

export default new FacultyController();