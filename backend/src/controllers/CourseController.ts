import { Request,Response,NextFunction } from "express";
import { CourseService } from "../services/index";
class Coursecontroller{
    
    async createCourse(req: Request, res: Response, next: NextFunction){

        const courseData = req.body;
        try{
            const newCourse = await CourseService.create(courseData);
            res.status(200).json(newCourse);
        }catch(error){
            next(error);
        }
    }

    async getCourseById(req: Request, res: Response, next: NextFunction){

        try{
            const course = await CourseService.getById(req.params.ID);
            res.status(200).json(course);
        }catch(error){
            next(error);
        }
    }

    async updateCourseById(req: Request, res: Response, next: NextFunction){
        
        const courseData = req.body;
        try{
            const updatedCourse = await CourseService.updateById(req.params.ID,courseData);
            res.status(200).json(updatedCourse);
        }catch(error){
            next(error);
        }
    }

    async deleteCourseById(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await CourseService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await CourseService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }
}

export default new Coursecontroller();