"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const router = express_1.default.Router();
router.post("/", controllers_1.ComplaintController.createComplaint);
router.get("/:ID", controllers_1.ComplaintController.getComplaintById);
router.put("/update/:ID", controllers_1.ComplaintController.updateComplaintById);
router.delete("/delete/:ID", controllers_1.ComplaintController.deleteComplaintById);
router.get("/getall", controllers_1.ComplaintController.getAll);
exports.default = router;
