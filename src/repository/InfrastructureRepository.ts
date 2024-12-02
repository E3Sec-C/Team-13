import InfrastructureModel from "../models/InfrastructureModel";
import { infrastructure } from "../types/infrastructure";
import CrudRepository from "./CrudRepository";

class InfrastructureRepository extends CrudRepository<infrastructure>{
    
    constructor(){

        super(InfrastructureModel);
    }

    async getByAssetName(assetName:string):Promise<infrastructure|null>{

        try{
            const response = await InfrastructureModel.findOne({assetName});
            return response;
        }catch(error){
            throw new Error("Failed to get the Infrastructure name");
        }
    }

    async updateByAssetName(assetName:string, data:Partial<infrastructure>):Promise<infrastructure|null>{
        
        try{
            const response = await InfrastructureModel.findOneAndUpdate({assetName},data,{new:true});
            return response;

        }catch(error){
            throw new Error("Failed in updating the infrastructure with given Name");
        }
    }

    async deleteByAssetName(assetName: string):Promise<infrastructure|null>{
        
        try{
            const response = await InfrastructureModel.findOneAndDelete({assetName});
            return response;
        }catch(error){
            throw new Error("Failed to delete Infrastructure Details ${error.message}");
        }
    }
}

export default new InfrastructureRepository();