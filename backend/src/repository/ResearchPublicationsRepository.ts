import ResearchPublicationsModel from "../models/ResearchPublicationsModel";
import { researchPublications } from "../types/researchPublications";
import CrudRepository from "./crudRepo";

class ResearchPublicationsRepository extends CrudRepository<researchPublications>{
    constructor(){
        super(ResearchPublicationsModel);
    }
}

export default new ResearchPublicationsRepository();