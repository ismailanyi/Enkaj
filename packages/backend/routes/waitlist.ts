import { Router } from "express";
import { WaitlistController } from "../controllers/waitlist";

const router = Router();
const wlCtrl = new WaitlistController();

router.post("/", wlCtrl.create);

router.get("/", wlCtrl.list);

router.patch("/:email", wlCtrl.update);

router.delete("/:email", wlCtrl.delete);

export default router;
