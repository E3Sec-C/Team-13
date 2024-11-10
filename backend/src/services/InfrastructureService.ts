import { infrastructure } from "../types/infrastructure";
import { InfrastructureRepository } from "../repository/index"
import { ConflictError,NotFoundError } from "../exceptions/CustomExceptions";

class InfrastructureService{
    async create(infrastructureData: Partial<infrastructure>):Promise<infrastructure|null>{

        const {assetName} = infrastructureData;

        const result = await InfrastructureRepository.getByData({assetName:assetName});
        if(result){
            throw new ConflictError("Already existed Infrastructure with similar name");
        }
        const response = await InfrastructureRepository.create(infrastructureData);
        return response;
    }

    async getByAssetName(assetName: string):Promise<infrastructure|null>{

        const res = await InfrastructureRepository.getByAssetName(assetName);
        if(!res){
            throw new NotFoundError("Asset with given name not found");
        }
        return res;
        
    }

    async updateByAssetName(assetName: string, infrastructureData: Partial<infrastructure>): Promise<infrastructure|null>{
        
        const response = await InfrastructureRepository.updateById(assetName,infrastructureData);
        if(!response){
            throw new NotFoundError("Infrastructure with given assetName not found");
        }
        return response;
    }

    async deleteByAssetName(assetName: string): Promise<infrastructure>{
        
        const response = await InfrastructureRepository.deleteById(assetName);
        if(!response){
            throw new NotFoundError("Infrastructure with given assetName not found");
        }
        return response;
    }

    async getAll():Promise<infrastructure[] | null>{

        return await InfrastructureRepository.getAll();
    }

}

export default new InfrastructureService ();