import express from "express"
import version1 from './v1/index'

const router=express.Router()

router.use('/v1',version1);

export default router