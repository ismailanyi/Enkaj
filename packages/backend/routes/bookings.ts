import { Router } from "express";
import { BookingsController } from "../controllers/bookings";
import { authorize } from "../middleware/auth";

const router = Router();
const bookingCtrl = new BookingsController();

router.post(
  "/",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  bookingCtrl.create
);

// find booking slot
// router.get("/findslot", bookingCtrl.search);

// get bookings list
router.get("/", bookingCtrl.list);

router.patch(
  "/:id",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  bookingCtrl.update
);

router.delete(
  "/:id",
  // authenticate,
  // TODO: User who created booking or admin
  // authorize(["Admin", "Visitor"]),
  bookingCtrl.cancelB
);

export default router;
