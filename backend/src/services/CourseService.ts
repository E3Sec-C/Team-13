import { course } from "../types/courses";
import { CourseRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class CourseService{
    async create(courseData: Partial<course>):Promise<course|null>{

        const {ID} = courseData;

        const result = await CourseRepository.getByData({ID:ID});
        if(result){
            throw new ConflictError("Already existed Course with similar ID");
        }
        const response = await CourseRepository.create(courseData);
        return response;
    }

    async getById(ID: string):Promise<course|null>{

        const res = await CourseRepository.getById(ID);
        if(!res){
            throw new NotFoundError("Course with given ID not found");
        }
        return res;
    }

    async updateById(ID: string, courseData: Partial<course>): Promise<course|null>{
        
        const response = await CourseRepository.updateById(ID,courseData);
        if(!response){
            throw new NotFoundError("Course with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<course>{
        
        const response = await CourseRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("Course with given ID not found");
        }
        return response;
    }

    async getAll():Promise<course[] | null>{

        return await CourseRepository.getAll();
    }

}

export default new CourseService ();