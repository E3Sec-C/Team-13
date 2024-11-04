import { Request,Response,NextFunction } from "express";
import { HodService } from "../services/index";
class HodController{

    async createHod(req: Request, res: Response, next: NextFunction){

        const hodData = req.body;
        try{
            const newHod = await HodService.create(hodData);
            res.status(200).json(newHod);
        }catch(error){
            next(error);
        }
    }

    async getHodById(req: Request, res: Response, next: NextFunction){

        try{
            const hod = await HodService.getById(req.params.ID);
            res.status(200).json(hod);
        }catch(error){
            next(error);
        }
    }

    async updateHodById(req: Request, res: Response, next: NextFunction){
        
        const hodData = req.body;
        try{
            const updatedHod = await HodService.updateById(req.params.ID,hodData);
            res.status(200).json(updatedHod);
        }catch(error){
            next(error);
        }
    }

    async deleteHodById(req: Request, res: Response, next: NextFunction){
        
        try{
            const response = await HodService.deleteById(req.params.ID);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){

        try{
            const response = await HodService.getAll();
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

}
export default new HodController();