import express,{ Request,Response } from "express";
import adminRoutes from "./adminRoutes";

const router=express.Router()
   
router.use("/admin",adminRoutes);

router.get("/home",(req,res)=>{
    res.status(201).json({
        message:"Welcome to UDIS"
    })
})


export default router;
