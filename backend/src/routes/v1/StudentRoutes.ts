import express from "express";
import { StudentController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",StudentController.getAll);
router.post("/",StudentController.createStudent);
router.get("/:ID",StudentController.getStudentById);
router.put("/update/:ID",StudentController.updateStudentById);
router.delete("/delete/:ID",StudentController.deleteStudentById);

export default router;