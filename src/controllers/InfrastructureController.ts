import { Request,Response,NextFunction } from "express";
import { InfrastructureService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class Infrastructurecontroller{
    
    createInfrastructure = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const newInfrastructure = await InfrastructureService.create(req.body);
        res.status(200).json(newInfrastructure);
    });

    getInfrastructureByAssetName = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const infrastructure = await InfrastructureService.getByAssetName(req.params.assetName);
        res.status(200).json(infrastructure);
    });

    updateInfrastructureByAssetName = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const updatedInfrastructure = await InfrastructureService.updateByAssetName(req.params.assetName,req.body);
        res.status(200).json(updatedInfrastructure);
    });

    deleteInfrastructureByAssetName = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await InfrastructureService.deleteByAssetName(req.params.assetName);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await InfrastructureService.getAll();
        res.status(200).json(response);
    });

}

export default new Infrastructurecontroller();