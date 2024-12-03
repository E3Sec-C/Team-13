import { complaint } from "../types/complaints";
import { ComplaintRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class ComplaintService{
    async create(complaintData: Partial<complaint>):Promise<complaint|null>{
        const {ID} = complaintData;
        const res = await ComplaintRepository.getByData({ID:ID});
        if(res){
            throw new ConflictError("Already Exist");
        }
        const response = await ComplaintRepository.create(complaintData);
        return response;
    }

    async getById(ID: string):Promise<complaint|null>{

        const res = await ComplaintRepository.getById(ID);
        if(!res){
            throw new NotFoundError("Compaint with given ID not found");
        }
        return res;
    }

    async updateById(ID: string, complaintData: Partial<complaint>): Promise<complaint|null>{
        
        const response = await ComplaintRepository.updateById(ID,complaintData);
        if(!response){
            throw new NotFoundError("Complaint with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<complaint>{
        
        const response = await ComplaintRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("Complaint with given ID not found");
        }
        return response;
    }
    async getAll():Promise<complaint[] | null>{

        return await ComplaintRepository.getAll();
    }

}

export default new ComplaintService ();