import { researchPublications } from "../types/researchPublications";
import { ResearchPublicationsRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class ResearchPublicationsService{
    async create(researchPublicationsData: Partial<researchPublications>):Promise<researchPublications|null>{

        const {ID} = researchPublicationsData;

        const result = await ResearchPublicationsRepository.getByData({ID:ID});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await ResearchPublicationsRepository.create(researchPublicationsData);
        return response;
    }

    async getById(ID: string):Promise<researchPublications|null>{

        return await ResearchPublicationsRepository.getById(ID);
    }

    async updateById(ID: string, researchPublicationsData: Partial<researchPublications>): Promise<researchPublications|null>{
        
        const response = await ResearchPublicationsRepository.updateById(ID,researchPublicationsData);
        if(!response){
            throw new NotFoundError("ResearchPublications with given ID not found");
        }
        return response;
    }

    async deleteById(ID: string): Promise<researchPublications>{
        
        const response = await ResearchPublicationsRepository.deleteById(ID);
        if(!response){
            throw new NotFoundError("ResearchPublications with given ID not found");
        }
        return response;
    }

    async getAll():Promise<researchPublications[] | null>{

        return await ResearchPublicationsRepository.getAll();
    }

}

export default new ResearchPublicationsService ();