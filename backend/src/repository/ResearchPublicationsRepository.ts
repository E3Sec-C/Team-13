import ResearchPublicationsModel from "../models/ResearchPublicationsModel";
import { researchPublications } from "../types/researchPublications";
import CrudRepository from "./CrudRepository";

class ResearchPublicationsRepository extends CrudRepository<researchPublications>{
    constructor(){
        super(ResearchPublicationsModel);
    }
    async getByTitle(title:string):Promise<researchPublications|null>{

        try{
            const response = await ResearchPublicationsModel.findOne({title});
            return response;
        }catch(error){
            throw new Error("Failed to get the Infrastructure name");
        }
    }

    async deleteByTitle(title: string):Promise<researchPublications|null>{
        
        try{
            const response = await ResearchPublicationsModel.findOneAndDelete({title});
            return response;
        }catch(error){
            throw new Error("Failed to delete Infrastructure Details ${error.message}");
        }
    }
}

export default new ResearchPublicationsRepository();