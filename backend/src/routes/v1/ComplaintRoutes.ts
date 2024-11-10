import express from "express";
import { ComplaintController } from "../../controllers";

const router = express.Router()

router.get("/getall",ComplaintController.getAll);
router.post("/",ComplaintController.createComplaint);
router.get("/:ID",ComplaintController.getComplaintById);
router.put("/update/:ID",ComplaintController.updateComplaintById);
router.delete("/delete/:ID",ComplaintController.deleteComplaintById);

export default router;