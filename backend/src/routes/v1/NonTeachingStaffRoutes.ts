import express from "express";
import { NonTeachingStaffController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",NonTeachingStaffController.getAll);
router.post("/",NonTeachingStaffController.createNonTeachingStaff);
router.get("/:ID",NonTeachingStaffController.getNonTeachingStaffById);
router.put("/update/:ID",NonTeachingStaffController.updateNonTeachingStaffById);
router.delete("/delete/:ID",NonTeachingStaffController.deleteNonTeachingStaffById);

export default router;