import express from "express"
import {UserController} from "../../controllers/index";

const router = express.Router();

router.post("/signin",UserController.signin);
router.post("/signup",UserController.signup);
router.put("/update",UserController.updatePassword);
router.delete("/remove/:userId",UserController.removeUser);

export default router;
