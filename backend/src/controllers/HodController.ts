import { Request,Response,NextFunction } from "express";
import { HodService } from "../services/index";
import { asyncHandler } from "../middlewares/asyncHandler";
class HodController{

    createHod = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const newHod = await HodService.create(req.body);
        res.status(200).json(newHod);
    });

    getHodById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const hod = await HodService.getById(req.params.ID);
            res.status(200).json(hod);
    });

    updateHodById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const updatedHod = await HodService.updateById(req.params.ID,req.body);
        res.status(200).json(updatedHod);
    }); 

    deleteHodById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await HodService.deleteById(req.params.ID);
        res.status(200).json(response);
    });

    getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
        const response = await HodService.getAll();
        res.status(200).json(response);
    });

}
export default new HodController();