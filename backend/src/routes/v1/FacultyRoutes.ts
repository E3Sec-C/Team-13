import express from "express";
import { FacultyController } from "../../controllers";

const router = express.Router()

router.post("/",FacultyController.createFaculty);
router.get("/:ID",FacultyController.getfacultyById);
router.put("/update/:ID",FacultyController.updateFacultyById);
router.delete("/delete/:ID",FacultyController.deletefacultyById);
router.get("/getall",FacultyController.getAll);

export default router;