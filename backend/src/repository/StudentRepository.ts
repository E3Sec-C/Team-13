import StudentModel from "../models/StudentModel";
import { student } from "../types/student";
import CrudRepository from "./crudRepo";

class StudentRepository extends CrudRepository<student>{
    constructor(){
        super(StudentModel);
    }
}

export default new StudentRepository();