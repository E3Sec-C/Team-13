import { nonTeachingStaff } from "../types/nonTeachingStaff";
import { NonTeachingStaffRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class NonTeachingStaffService{
    async create(nonTeachingStaffData: Partial<nonTeachingStaff>):Promise<nonTeachingStaff|null>{

        const {ID} = nonTeachingStaffData;

        const result = await NonTeachingStaffRepository.getByData({ID:ID});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await NonTeachingStaffRepository.create(nonTeachingStaffData);
        return response;
    }

    async getById(ID: string):Promise<nonTeachingStaff|null>{

        return await NonTeachingStaffRepository.getById(ID);
    }

    async updateById(ID: string, nonTeachingStaffData: Partial<nonTeachingStaff>): Promise<nonTeachingStaff|null>{
        
        const response = await NonTeachingStaffRepository.updateById(ID,nonTeachingStaffData);
        if(!response){
            throw new NotFoundError("NonTeachingStaff with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<nonTeachingStaff>{
        
        const response = await NonTeachingStaffRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("NonTeachingStaff with given ID not found");
        }
        return response;
    }

    async getAll():Promise<nonTeachingStaff[] | null>{

        return await NonTeachingStaffRepository.getAll();
    }

}

export default new NonTeachingStaffService ();