import express from "express";
import { ResearchPublicationsController } from "../../controllers/index";

const router = express.Router()

router.get("/getall",ResearchPublicationsController.getAll);
router.post("/",ResearchPublicationsController.createResearchPublications);
router.get("/:title",ResearchPublicationsController.getResearchPublicationsByTitle);
router.delete("/delete/:title",ResearchPublicationsController.deleteResearchPublicationsByTitle);

export default router;