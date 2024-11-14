import path from 'path';
import { promises as fsPromises } from "fs";
import { Response } from 'express'; // Assuming you're using Express

const ImageRepository = {
    async getImageById(ID: string,role:string) {
        // Construct the file path for the image
        const filePath = path.join(__dirname, "../", "../", "images", `${role}`, `${ID}.jpg`);

        try {
            // Check if file exists
            await fsPromises.access(filePath);

            return filePath; 
        } catch (error) {
            // Log the error and send a 404 response if the image is not found
            console.error("Error accessing image file:", error);
        }
    },
};

export default ImageRepository;
