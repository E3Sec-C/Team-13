import { admin } from "../types/admin";
import adminRepository from "../repository/AdminRepository";
import { ConflictError, NotFoundError } from "../exceptions/CustomExceptions";
import mongoose from "mongoose";

class AdminService{
    async create(adminData: Partial<admin>):Promise<admin|null>{
        const {userId,email,adminId} = adminData;
        console.log(adminData);
        const result = await adminRepository.getByData({userId:userId,email:email,adminId:adminId});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await adminRepository.create(adminData);
        return response;
    }
    async getById(id: string):Promise<admin|null>{
        return await adminRepository.getById(id);
    }
    async updateById(id: string, adminData: Partial<admin>): Promise<admin|null>{
        const response = await adminRepository.updateById(id,adminData);
        if(!response){
            throw new NotFoundError("Admin with given ID not found");
        }
        return response;
    }
    async deleteById(id: string): Promise<admin>{
        const response = await adminRepository.deleteById(id);
        if(!response){
            throw new NotFoundError("Admin with given ID not found");
        }
        return response;
    }
}

export default new AdminService();