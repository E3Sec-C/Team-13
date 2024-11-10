import express from "express";
import { InfrastructureController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",InfrastructureController.getAll);
router.post("/",InfrastructureController.createInfrastructure);
router.get("/:ID",InfrastructureController.getInfrastructureByAssetName);
router.put("/update/:ID",InfrastructureController.updateInfrastructureByAssetName);
router.delete("/delete/:ID",InfrastructureController.deleteInfrastructureByAssetName);

export default router;