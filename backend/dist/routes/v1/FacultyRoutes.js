"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const router = express_1.default.Router();
router.post("/", controllers_1.FacultyController.createFaculty);
router.get("/:ID", controllers_1.FacultyController.getfacultyById);
router.put("/update/:ID", controllers_1.FacultyController.updateFacultyById);
router.delete("/delete/:ID", controllers_1.FacultyController.deletefacultyById);
router.get("/getall", controllers_1.FacultyController.getAll);
exports.default = router;
