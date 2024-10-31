import FacultyModel from "../models/FacultyModel";
import { faculty } from "../types/faculty";
import CrudRepository from "./crudRepo";

class FacultyRepository extends CrudRepository<faculty>{
    constructor(){
        super(FacultyModel);
    }
}

export default new FacultyRepository();