import express from "express"
import adminController from "../../controllers/AdminController";

const router = express.Router();

router.post("/",adminController.createAdmin);
router.get("/:id",adminController.getAdminById);
router.put("/update/:id",adminController.updateAdminById);
router.delete("/delete/:id",adminController.deleteAdminById)

export default router;