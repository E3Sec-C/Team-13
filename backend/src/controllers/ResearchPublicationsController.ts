import { Request,Response,NextFunction } from "express";
import { ResearchPublicationsService } from "../services/index";
class ResearchPublicationscontroller{
    
    async createResearchPublications(req: Request, res: Response, next: NextFunction){

        const researchPublicationsData = req.body;
        try{
            const newResearchPublications = await ResearchPublicationsService.create(researchPublicationsData);
            res.status(200).json(newResearchPublications);
        }catch(error){
            next(error);
        }
    }

    async getResearchPublicationsById(req: Request, res: Response, next: NextFunction){

        try{
            const researchPublications = await ResearchPublicationsService.getById(req.params.ID);
            res.status(200).json(researchPublications);
        }catch(error){
            next(error);
        }
    }

    async updateResearchPublicationsById(req: Request, res: Response, next: NextFunction){
        
        const researchPublicationsData = req.body;
        try{
            const updatedResearchPublications = await ResearchPublicationsService.updateById(req.params.ID,researchPublicationsData);
            res.status(200).json(updatedResearchPublications);
        }catch(error){
            next(error);
        }
    }

    async deleteResearchPublicationsById(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await ResearchPublicationsService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await ResearchPublicationsService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }
}

export default new ResearchPublicationscontroller();