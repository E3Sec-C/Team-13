import FundsModel from "../models/FundsModel";
import { fund } from "../types/funds";
import CrudRepository from "./crudRepo";

class FundsRepository extends CrudRepository<fund>{
    constructor(){
        super(FundsModel);
    }
}

export default new FundsRepository();