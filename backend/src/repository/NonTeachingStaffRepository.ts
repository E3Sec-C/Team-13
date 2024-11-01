import NonTeachingStaffModel from "../models/NonTeachingStaffModel";
import { nonTeachingStaff } from "../types/nonTeachingStaff";
import CrudRepository from "./CrudRepository";

class NonTeachingStaffRepository extends CrudRepository<nonTeachingStaff>{
    constructor(){
        super(NonTeachingStaffModel);
    }
}

export default new NonTeachingStaffRepository();