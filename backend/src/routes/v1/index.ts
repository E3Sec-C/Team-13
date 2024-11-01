import express,{ Request,Response } from "express";
import AdminRoutes from "./AdminRoutes";
import StudentRoutes from "./StudentRoutes";

const router=express.Router()
   
router.use("/admin",AdminRoutes);
router.use('/student',StudentRoutes)

router.get("/home",(req,res)=>{
    res.status(201).json({
        message:"Welcome to UDIS"
    })
})


export default router;
