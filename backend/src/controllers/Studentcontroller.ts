import { Request,Response,NextFunction } from "express";
import { StudentService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class Studentcontroller{
    
    createStudent = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const newStudent = await StudentService.create(req.body);
        res.status(200).json(newStudent);
    });

    getStudentById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const student = await StudentService.getById(req.params.ID);
        res.status(200).json(student);
    });

    updateStudentById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const updatedStudent = await StudentService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedStudent);
    });

    deleteStudentById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await StudentService.deleteById(req.params.ID);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await StudentService.getAll();
        res.status(200).json(response);
    });

}

export default new Studentcontroller();