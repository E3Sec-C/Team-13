import { researchPublications } from "../types/researchPublications";
import { ResearchPublicationsRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class ResearchPublicationsService{
    async create(researchPublicationsData: Partial<researchPublications>):Promise<researchPublications|null>{

        const {title} = researchPublicationsData;

        const result = await ResearchPublicationsRepository.getByData({title:title});
        if(result){
            throw new ConflictError("Already existed user with similar data");
        }
        const response = await ResearchPublicationsRepository.create(researchPublicationsData);
        return response;
    }

    async getByTitle(title: string):Promise<researchPublications|null>{

        const res = await ResearchPublicationsRepository.getByTitle(title);
        if(!res){
            throw new NotFoundError("Research or Publication not found");
        }
        return res;
    }

    async deleteByTitle(title: string): Promise<researchPublications>{
        
        const response = await ResearchPublicationsRepository.deleteByTitle(title);
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