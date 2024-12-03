import { Request,Response,NextFunction } from "express";
import { ResearchPublicationsService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class ResearchPublicationscontroller{
    
    createResearchPublications = asyncHandler( async (req: Request, res: Response, next: NextFunction)=>{
        const newResearchPublications = await ResearchPublicationsService.create(req.body);
        res.status(200).json(newResearchPublications);
    });

    getResearchPublicationsByTitle = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const researchPublications = await ResearchPublicationsService.getByTitle(req.params.title);
        res.status(200).json(researchPublications);
    });

    deleteResearchPublicationsByTitle = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        const response = await ResearchPublicationsService.deleteByTitle(req.params.title);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await ResearchPublicationsService.getAll();
        res.status(200).json(response);
    });

}

export default new ResearchPublicationscontroller();