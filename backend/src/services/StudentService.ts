import { student } from "../types/student";
import { StudentRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class StudentService{
    async create(studentData: Partial<student>):Promise<student|null>{

        const {ID} = studentData;

        const result = await StudentRepository.getByData({ID:ID});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await StudentRepository.create(studentData);
        return response;
    }

    async getById(ID: string):Promise<student|null>{

        const res = await StudentRepository.getById(ID);
        if(!res){
            throw new NotFoundError("Student with given ID not found");
        }
        return res;
    }

    async updateById(ID: string, studentData: Partial<student>): Promise<student|null>{
        
        const response = await StudentRepository.updateById(ID,studentData);
        if(!response){
            throw new NotFoundError("Student with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<student>{
        
        const response = await StudentRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("Student with given ID not found");
        }
        return response;
    }

    async getAll():Promise<student[] | null>{

        return await StudentRepository.getAll();
    }

}

export default new StudentService ();