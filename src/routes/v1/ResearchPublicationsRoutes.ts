import express from "express";
import { ResearchPublicationsController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",ResearchPublicationsController.getAll);
router.post("/",ResearchPublicationsController.createResearchPublications);
router.get("/:ID",ResearchPublicationsController.getResearchPublicationsById);
router.put("/update/:ID",ResearchPublicationsController.updateResearchPublicationsById);
router.delete("/delete/:ID",ResearchPublicationsController.deleteResearchPublicationsById);

export default router;