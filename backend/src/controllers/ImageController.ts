import { Request, Response,NextFunction } from 'express';
import { ImageServices } from '../services';
import { asyncHandler } from "../middlewares/asyncHandler";

class ImageController {

    getImageById = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        
      const ID:string = req.params.ID as string;
      const role:string = req.params.role as string;
      //request getImageById function to get the image corresponds to given ID
      const response=await ImageServices.getImageById(ID,role);
      
      if(response==null)
      {
        return res.status(404).json({message:"file doesn't exsits"});
      }

      const filePath = response.filePath;
        
        // Send the image file as a response
        return res.sendFile(filePath as string, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                return res.status(500).json({ message: "Error serving image" });
            }
        });
    })
}

export default new ImageController();