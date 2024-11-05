"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminRoutes_1 = __importDefault(require("./AdminRoutes"));
const StudentRoutes_1 = __importDefault(require("./StudentRoutes"));
const FacultyRoutes_1 = __importDefault(require("./FacultyRoutes"));
const HodRoutes_1 = __importDefault(require("./HodRoutes"));
const ComplaintRoutes_1 = __importDefault(require("./ComplaintRoutes"));
const CourseRoutes_1 = __importDefault(require("./CourseRoutes"));
const InfrastructureRoutes_1 = __importDefault(require("./InfrastructureRoutes"));
const NonTeachingStaffRoutes_1 = __importDefault(require("./NonTeachingStaffRoutes"));
const ResearchPublicationsRoutes_1 = __importDefault(require("./ResearchPublicationsRoutes"));
const router = express_1.default.Router();
router.use("/admin", AdminRoutes_1.default);
router.use('/student', StudentRoutes_1.default);
router.use("/faculty", FacultyRoutes_1.default);
router.use("/hod", HodRoutes_1.default);
router.use("/complaint", ComplaintRoutes_1.default);
router.use("/course", CourseRoutes_1.default);
router.use("/infrastructure", InfrastructureRoutes_1.default);
router.use("/nonteachingstaff", NonTeachingStaffRoutes_1.default);
router.use("/researchpublications", ResearchPublicationsRoutes_1.default);
router.get("/home", (req, res) => {
    res.status(201).json({
        message: "Welcome to UDIS"
    });
});
exports.default = router;
