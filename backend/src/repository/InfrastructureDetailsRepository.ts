import InfastructureDetailsModel from "../models/InfastructureDetailsModel";
import { infrastructureDetails } from "../types/infrastructureDetails";
import CrudRepository from "./crudRepo";

class InfrastructureDetailsRepository extends CrudRepository<infrastructureDetails>{
    constructor(){
        super(InfastructureDetailsModel);
    }
}

export default new InfrastructureDetailsRepository();