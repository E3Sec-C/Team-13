import { hod } from "../types/hod";
import { HodRepository } from "../repository";
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class HodService{
    async create(hodData: Partial<hod>):Promise<hod|null>{

        const {ID} = hodData;

        const result = await HodRepository.getByData({ID:ID});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await HodRepository.create(hodData);
        return response;
    }

    async getById(ID: string):Promise<hod|null>{

        return await HodRepository.getById(ID);
    }

    async updateById(ID: string, hodData: Partial<hod>): Promise<hod|null>{
        
        const response = await HodRepository.updateById(ID,hodData);
        if(!response){
            throw new NotFoundError("HOD with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<hod>{
        
        const response = await HodRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("HOD with given ID not found");
        }
        return response;
    }

    async getAll():Promise<hod[] | null>{

        return await HodRepository.getAll();
    }

}
export default new HodService();