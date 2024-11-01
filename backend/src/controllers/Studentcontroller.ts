import { Request,Response,NextFunction } from "express";
import { StudentService } from "../services/index";
class Studentcontroller{
    async createStudent(req: Request, res: Response, next: NextFunction){
        const studentData = req.body;
        try{
            const newStudent = await StudentService.create(studentData);
            res.status(200).json(newStudent);
        }catch(error){
            next(error);
        }
    } 
    async getStudentById(req: Request, res: Response, next: NextFunction){
        try{
            const student = await StudentService.getById(req.params.ID);
            res.status(200).json(student);
        }catch(error){
            next(error);
        }
    }
    async updateStudentById(req: Request, res: Response, next: NextFunction){
        const studentData = req.body;
        try{
            const updatedStudent = await StudentService.updateById(req.params.ID,studentData);
            res.status(200).json(updatedStudent);
        }catch(error){
            next(error);
        }
    }
    async deleteStudentById(req: Request, res: Response, next: NextFunction){
        try{
            const response = await StudentService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }
}

export default new Studentcontroller();