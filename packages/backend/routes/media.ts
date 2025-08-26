import { NextFunction, Router } from "express";
import { authorize } from "../middleware/auth";
import { MediaController } from "../controllers/media";

const router = Router();
const mediaCtrl = new MediaController();

/* router.post(
  "/",
  mediaCtrl.upload.single("image"),
  mediaCtrl.uploadImage
); */

router.post(
  "/",
  // authenticate,
  mediaCtrl.upload.array("images", 10), // max 10 images
  mediaCtrl.uploadMultipleImages
);

router.delete(
  "/",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  mediaCtrl.deleteMultipleImages
);

/* router.delete(
  "/:publicId",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  mediaCtrl.deleteImage
); */

export default router;
