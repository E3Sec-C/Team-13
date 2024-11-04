import express from "express";
import { InfrastructureController } from "../../controllers/index";

const router = express.Router()

router.post("/",InfrastructureController.createInfrastructure);
router.get("/:ID",InfrastructureController.getInfrastructureByAssetName);
router.put("/update/:ID",InfrastructureController.updateInfrastructureByAssetName);
router.delete("/delete/:ID",InfrastructureController.deleteInfrastructureByAssetName);
router.get("/getall",InfrastructureController.getAll);

export default router;