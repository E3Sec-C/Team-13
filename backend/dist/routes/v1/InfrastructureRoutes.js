"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/index");
const router = express_1.default.Router();
router.post("/", index_1.InfrastructureController.createInfrastructure);
router.get("/:ID", index_1.InfrastructureController.getInfrastructureByAssetName);
router.put("/update/:ID", index_1.InfrastructureController.updateInfrastructureByAssetName);
router.delete("/delete/:ID", index_1.InfrastructureController.deleteInfrastructureByAssetName);
router.get("/getall", index_1.InfrastructureController.getAll);
exports.default = router;
