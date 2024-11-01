import mongoose, { Document, FilterQuery, Model } from "mongoose";
import { ValidationError } from "../exceptions/CustomExceptions";

class CrudRepository<T extends Document>{
    private model:Model<T>;

    constructor(model:Model<T>){
        this.model = model;
    }

    async create(data: Partial<T>):Promise<T>{
        try{
            const result = await this.model.create(data);
            return result;
        }catch(error){
            throw error;
        }
    }

    async deleteById(id: string):Promise<T|null>{
        //checking whether the given id is valid or not
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid id format");
        }
        try{
            const response = await this.model.findByIdAndDelete(id);
            return response;
        }catch(error){
            throw new Error("Failed to delete document ${error.message}");
        }
    }
    async getById(id:string):Promise<T|null>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ValidationError("Invalid ID format");
        }
        try{
            const response = await this.model.findById(id);
            return response;
        }catch(error){
            throw new Error("Failed in getting the document with given id");
        }
    }
    async getByData(data: FilterQuery<T>):Promise<T|null>{
        try{
            const response = this.model.findOne(data);
            return response;
        }catch(error){
            throw new Error("Failed in getting the document with given data");
        }
    }
    async getAll():Promise<T[]|null>{
        try{
            const response = await this.model.find({}).maxTimeMS(5000);
            return response;
        }catch(error){
            throw new Error("Failed in getting all documents");
        }
    }
    async updateById(id:string, data:Partial<T>):Promise<T|null>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ValidationError("Invalid ID format");
        }
        try{
            const response = await this.model.findByIdAndUpdate(id,data,{new:true});
            //{new:true}=> return the updated document instead of old document
            return response;
        }catch(error){
            throw new Error("Failed in updating the document with given id");
        }
    }
}

export default CrudRepository;