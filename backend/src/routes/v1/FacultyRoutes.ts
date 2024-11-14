import express from "express";
import { FacultyController, ImageController } from "../../controllers";
import upload from "../../multer";

const router = express.Router()

router.post("/upload/image",upload.single("faculty"), (req:any, res:any) => {
    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send('No image uploaded');
    }
  
    // Access the query parameter 'ID'
    const {ID = "", role=" "}=req.query;
  
    // Check if 'ID' is provided in the query string
    if (!ID) {
      return res.status(400).send('Missing query parameter: ID');
    }
  
    // If the image was uploaded successfully, return a response with the image details and user ID
    res.json({
      message: 'Image uploaded successfully!',
      userId: ID,
      imagePath: `/backend/images/${req.file.filename}`,  // Path where the image is stored
    });
  });
router.get("/getall",FacultyController.getAll);
router.post("/",FacultyController.createFaculty);
router.get("/:ID",FacultyController.getFacultyById);
router.put("/update/:ID",FacultyController.updateFacultyById);
router.delete("/delete/:ID",FacultyController.deleteFacultyById);
router.get('/image/:ID/:role', ImageController.getImageById);

export default router;