import express from "express";
import { CourseController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",CourseController.getAll);
router.post("/",CourseController.createCourse);
router.get("/:ID",CourseController.getCourseById);
router.put("/update/:ID",CourseController.updateCourseById);
router.delete("/delete/:ID",CourseController.deleteCourseById);


export default router;