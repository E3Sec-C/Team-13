import express from "express";
import { FacultyController } from "../../controllers";

const router = express.Router()

router.get("/getall",FacultyController.getAll);
router.post("/",FacultyController.createFaculty);
router.get("/:ID",FacultyController.getFacultyById);
router.put("/update/:ID",FacultyController.updateFacultyById);
router.delete("/delete/:ID",FacultyController.deleteFacultyById);

export default router;