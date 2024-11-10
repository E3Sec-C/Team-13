import { Request,Response,NextFunction } from "express";
import { ResearchPublicationsService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class ResearchPublicationscontroller{
    
    createResearchPublications = asyncHandler( async (req: Request, res: Response, next: NextFunction)=>{
        const newResearchPublications = await ResearchPublicationsService.create(req.body);
        res.status(200).json(newResearchPublications);
    });

    getResearchPublicationsById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const researchPublications = await ResearchPublicationsService.getById(req.params.ID);
        res.status(200).json(researchPublications);
    });

    
    updateResearchPublicationsById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const updatedResearchPublications = await ResearchPublicationsService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedResearchPublications);
    });


    deleteResearchPublicationsById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await ResearchPublicationsService.deleteById(req.params.ID);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await ResearchPublicationsService.getAll();
        res.status(200).json(response);
    });

}

export default new ResearchPublicationscontroller();