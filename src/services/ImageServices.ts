import { ImageRepository } from "../repository";
const ImageServices={
   async getImageById(ID:string,role:string)
    { 
        try{
            const filePath= await ImageRepository.getImageById(ID,role);
            if(!filePath)
            {
                return {message:"Image Not Found"};
            }
            return {
                filePath:filePath
            };
        }catch(error)
        {
            throw new Error("Error Fetching Image");
        }
    }
}

export default ImageServices;