import express from "express";
import { CourseController } from "../../controllers/index";

const router = express.Router()

router.post("/",CourseController.createCourse);
router.get("/:ID",CourseController.getCourseById);
router.put("/update/:ID",CourseController.updateCourseById);
router.delete("/delete/:ID",CourseController.deleteCourseById);
router.get("/getall",CourseController.getAll);

export default router;