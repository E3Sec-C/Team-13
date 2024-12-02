import { Request,Response,NextFunction } from "express";
import { CourseService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class Coursecontroller{
    
    createCourse = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const newCourse = await CourseService.create(req.body);
        res.status(200).json(newCourse);
    });

    getCourseById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const course = await CourseService.getById(req.params.ID);
        res.status(200).json(course)
    });

    updateCourseById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const updatedCourse = await CourseService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedCourse);
    });

    deleteCourseById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await CourseService.deleteById(req.params.ID);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await CourseService.getAll();
        res.status(200).json(response);
    });
    
}

export default new Coursecontroller();