import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { UsersController } from "../controllers/users";

const router = Router();
const controller = new UsersController();

router.post("/login", controller.login);

router.post("/", controller.create);

router.get(
  "/",
  // authenticate,
  controller.getUsers
);

router.get(
  "/:id",
  // authenticate,
  controller.getById
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(["Admin"]),
  controller.update
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(["Admin"]),
  controller.deleteUser
);

export default router;
