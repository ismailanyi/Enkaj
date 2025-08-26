import { Router } from "express";
import { PropertiesController } from "../controllers/properties";
import { RatingsController } from "../controllers/ratings";
import { authenticate, authorize } from "../middleware/auth";
import { PropertyAgentsController } from "../controllers/propertyAgents";

const router = Router();
const pptyCtrl = new PropertiesController();
const ratingCtrl = new RatingsController();
const pptyAssignCtrl = new PropertyAgentsController();

router.post("/rate", ratingCtrl.rate);

router.post("/bookmark", pptyCtrl.bookmark);

// TODO: only admin assigns
// assign agent(s) to properties
router.post("/assign", pptyAssignCtrl.assign);

router.post(
  "/",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  pptyCtrl.create
);

// get agents assiged
router.get("/agentsAssigned", pptyAssignCtrl.find);

router.get("/", pptyCtrl.search);
router.get("/:id", pptyCtrl.search);

router.patch(
  "/:id",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  pptyCtrl.update
);

router.delete("/assign", pptyAssignCtrl.unassign);
router.delete("/assign/:id", pptyAssignCtrl.unassign);

router.delete(
  "/:id",
  // authenticate,
  // authorize(["Admin", "Agent"]),
  pptyCtrl.delete
);

export default router;
