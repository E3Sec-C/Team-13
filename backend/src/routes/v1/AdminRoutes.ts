import express from "express"
import {AdminController} from "../../controllers/index";

const router = express.Router();

router.post("/",AdminController.createAdmin);
router.get("/:ID",AdminController.getAdminById);
router.put("/update/:ID",AdminController.updateAdminById);
router.delete("/delete/:ID",AdminController.deleteAdminById)

export default router;