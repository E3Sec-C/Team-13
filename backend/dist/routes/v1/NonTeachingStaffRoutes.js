"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/index");
const router = express_1.default.Router();
router.post("/", index_1.NonTeachingStaffController.createNonTeachingStaff);
router.get("/:ID", index_1.NonTeachingStaffController.getNonTeachingStaffById);
router.put("/update/:ID", index_1.NonTeachingStaffController.updateNonTeachingStaffById);
router.delete("/delete/:ID", index_1.NonTeachingStaffController.deleteNonTeachingStaffById);
router.get("/getall", index_1.NonTeachingStaffController.getAll);
exports.default = router;
