import NonTeachingStaffModel from "../models/NonTeachingStaffModel";
import { nonTeachingStaff } from "../types/nonTeachingStaff";
import CrudRepository from "./crudRepo";

class NonTeachingStaffRepository extends CrudRepository<nonTeachingStaff>{
    constructor(){
        super(NonTeachingStaffModel);
    }
}

export default new NonTeachingStaffRepository();