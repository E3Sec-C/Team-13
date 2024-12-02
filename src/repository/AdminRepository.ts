import AdminModel from "../models/AdminModel";
import { admin } from "../types/admin";
import CrudRepository from "./CrudRepository";

class AdminRepository extends CrudRepository<admin>{
    constructor(){
        super(AdminModel);
    }
}

export default new AdminRepository();