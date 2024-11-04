import express from "express";
import { ResearchPublicationsController } from "../../controllers/index";

const router = express.Router()

router.post("/",ResearchPublicationsController.createResearchPublications);
router.get("/:ID",ResearchPublicationsController.getResearchPublicationsById);
router.put("/update/:ID",ResearchPublicationsController.updateResearchPublicationsById);
router.delete("/delete/:ID",ResearchPublicationsController.deleteResearchPublicationsById);
router.get("/getall",ResearchPublicationsController.getAll);

export default router;