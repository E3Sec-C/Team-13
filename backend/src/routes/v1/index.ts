import express,{ Request,Response } from "express";

const router=express.Router()
   

router.get("/home",(req,res)=>{
    res.status(201).json({
        message:"Welcome to UDIS"
    })
})


export default router;
