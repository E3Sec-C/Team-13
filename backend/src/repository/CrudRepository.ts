import mongoose, { Document, FilterQuery, Model } from "mongoose";
import { ValidationError } from "../exceptions/CustomExceptions";

class CrudRepository<T extends Document>{
    protected model:Model<T>;

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

    async deleteById(ID: string):Promise<T|null>{
        //checking whether the given id is valid or not
        // if(!mongoose.Types.ObjectId.isValid(ID)){
        //     throw new Error("Invalid id format");
        // }
        try{
            const response = await this.model.findOneAndDelete({ID});
            return response;
        }catch(error){
            throw new Error("Failed to delete document ${error.message}");
        }
    }
    
    async getById(ID:string):Promise<T|null>{
        // if(!mongoose.Types.ObjectId.isValid(ID)){
        //     throw new ValidationError("Invalid ID format");
        // }
        try{
            const response = await this.model.findOne({ID});
            return response;
        }catch(error){
            throw new Error("Failed in getting the document with given id");
        }
    }
    async getByData(data: FilterQuery<T>):Promise<T|null>{
        console.log("getByData");
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
    async updateById(ID:string, data:Partial<T>):Promise<T|null>{
        // if(!mongoose.Types.ObjectId.isValid(ID)){
        //     throw new ValidationError("Invalid ID format");
        // }
        try{
            const response = await this.model.findOneAndUpdate({ID},data,{new:true});
            //{new:true}=> return the updated document instead of old document
            return response;
        }catch(error){
            throw new Error("Failed in updating the document with given id");
        }
    }
    async updateByData(data:Partial<T>):Promise<T | null>{
        const {id,...updatedData}=data;
        try{
            const response = await this.model.findOneAndUpdate(id, data, {new:true});
            return response;
        }catch(error){
            throw error;
        }
    }   
}

export default CrudRepository;