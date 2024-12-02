import express,{ Request,Response } from "express";
import AdminRoutes from "./AdminRoutes";
import StudentRoutes from "./StudentRoutes";
import FacultyRoutes from "./FacultyRoutes";
import HodRoutes from "./HodRoutes";
import ComplaintRoutes from "./ComplaintRoutes";
import CourseRoutes from "./CourseRoutes";
import InfrastructureRoutes from "./InfrastructureRoutes";
import NonTeachingStaffRoutes from "./NonTeachingStaffRoutes";
import ResearchpublicationsRoutes from "./ResearchPublicationsRoutes";
import UserRoutes from "./UserRoutes";



const router=express.Router()
   
router.use("/admin",AdminRoutes);
router.use('/student',StudentRoutes);
router.use("/faculty",FacultyRoutes);
router.use("/hod",HodRoutes);
router.use("/complaint",ComplaintRoutes);
router.use("/course",CourseRoutes);
router.use("/infrastructure",InfrastructureRoutes);
router.use("/nonTeachingStaff",NonTeachingStaffRoutes);
router.use("/researchPublications",ResearchpublicationsRoutes);
router.use("/user",UserRoutes);


router.get("/home",(req,res)=>{
    res.status(201).json({
        message:"Welcome to UDIS"
    })
})


export default router;
