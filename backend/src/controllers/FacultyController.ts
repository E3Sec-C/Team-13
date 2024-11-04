import { FacultyService } from "../services/index";
import { Request,Response,NextFunction } from "express";

class FacultyController{

    async createFaculty(req: Request, res: Response, next: NextFunction){

        const facultyData = req.body;
        try{
            const newFaculty = await FacultyService.create(facultyData);
            res.status(200).json(newFaculty);
        }catch(error){
            next(error);
        }
    }

    async getfacultyById(req: Request, res: Response, next: NextFunction){

        try{
            const faculty = await FacultyService.getById(req.params.ID);
            res.status(200).json(faculty);
        }catch(error){
            next(error);
        }
    }

    async updateFacultyById(req: Request, res: Response, next: NextFunction){

        const facultyData = req.body;
        try{
            const updatedFaculty = await FacultyService.updateById(req.params.ID,facultyData);
            res.status(200).json(updatedFaculty);
        }catch(error){
            next(error);
        }
    }
    
    async deletefacultyById(req: Request, res: Response, next: NextFunction){

        try{
            const response = await FacultyService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await FacultyService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

}

export default new FacultyController();