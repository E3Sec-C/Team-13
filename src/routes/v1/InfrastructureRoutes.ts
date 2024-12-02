import express from "express";
import { InfrastructureController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",InfrastructureController.getAll);
router.post("/",InfrastructureController.createInfrastructure);
router.get("/:assetName",InfrastructureController.getInfrastructureByAssetName);
router.put("/update/:assetName",InfrastructureController.updateInfrastructureByAssetName);
router.delete("/delete/:assetName",InfrastructureController.deleteInfrastructureByAssetName);

export default router;