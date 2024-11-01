import { admin } from "../types/admin";
import AdminRepository from "../repository/AdminRepository";
import { ConflictError, NotFoundError } from "../exceptions/CustomExceptions";

class AdminService{
    async create(adminData: Partial<admin>):Promise<admin|null>{

        const {ID,email} = adminData;
        console.log(adminData);
        const result = await AdminRepository.getByData({ID:ID,email:email});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await AdminRepository.create(adminData);
        return response;
    }
    async getById(ID: string):Promise<admin|null>{
        return await AdminRepository.getById(ID);
    }
    async updateById(ID: string, adminData: Partial<admin>): Promise<admin|null>{
        const response = await AdminRepository.updateById(ID,adminData);
        if(!response){
            throw new NotFoundError("Admin with given ID not found");
        }
        return response;
    }
    async deleteById(ID: string): Promise<admin>{
        const response = await AdminRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("Admin with given ID not found");
        }
        return response;
    }
}

export default new AdminService();