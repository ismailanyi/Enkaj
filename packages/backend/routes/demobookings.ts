import { Router } from "express";
import { DemoBookingController } from "../controllers/demobooking";

const router = Router();
const demoBookingCtrl = new DemoBookingController();

router.post("/", demoBookingCtrl.create);

router.get("/", demoBookingCtrl.list);

router.patch("/:id", demoBookingCtrl.update);

router.delete("/:id", demoBookingCtrl.delete);

export default router;
