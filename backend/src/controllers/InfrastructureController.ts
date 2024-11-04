import { Request,Response,NextFunction } from "express";
import { InfrastructureService } from "../services/index";
class Infrastructurecontroller{
    
    async createInfrastructure(req: Request, res: Response, next: NextFunction){

        const infrastructureData = req.body;
        try{
            const newInfrastructure = await InfrastructureService.create(infrastructureData);
            res.status(200).json(newInfrastructure);
        }catch(error){
            next(error);
        }
    }

    async getInfrastructureByAssetName(req: Request, res: Response, next: NextFunction){

        try{
            const infrastructure = await InfrastructureService.getByAssetName(req.params.assetName);
            res.status(200).json(infrastructure);
        }catch(error){
            next(error);
        }
    }

    async updateInfrastructureByAssetName(req: Request, res: Response, next: NextFunction){
        
        const infrastructureData = req.body;
        try{
            const updatedInfrastructure = await InfrastructureService.updateByAssetName(req.params.assetName,infrastructureData);
            res.status(200).json(updatedInfrastructure);
        }catch(error){
            next(error);
        }
    }

    async deleteInfrastructureByAssetName(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await InfrastructureService.deleteByAssetName(req.params.assetName);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await InfrastructureService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }
}

export default new Infrastructurecontroller();