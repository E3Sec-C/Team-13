import { FacultyRepository } from "../repository";
import { faculty } from "../types/faculty";
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class FacultyService {

    async create(facultyData:Partial<faculty>):Promise<faculty | null>{

        const {ID=''}=facultyData;
        const result =  await FacultyRepository.getById(ID);
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await FacultyRepository.create(facultyData);
        return response;
    }

    async getById(ID: string):Promise<faculty|null>{

        const res = await FacultyRepository.getById(ID);
        if(!res){
            throw new NotFoundError("Faculty with given ID not found");
        }
        return res;
    } 

    async updateById(ID: string, facultyData: Partial<faculty>): Promise<faculty|null>{

        const response = await FacultyRepository.updateById(ID,facultyData);
        if(!response){
            throw new NotFoundError("Faculty with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<faculty>{

        const response = await FacultyRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("Faculty with given ID not found");
        }
        return response;
    }

    async getAll():Promise<faculty[] | null>{

        return await FacultyRepository.getAll();
    }

}

export default new FacultyService();