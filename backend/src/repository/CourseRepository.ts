import CourseModel from "../models/CourseModel";
import { course } from "../types/courses";
import CrudRepository from "./crudRepo";

class CourseRepository extends CrudRepository<course>{
    constructor(){
        super(CourseModel);
    }
}

export default new CourseRepository();