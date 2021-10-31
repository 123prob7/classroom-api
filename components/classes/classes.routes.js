import { Router } from "express";
import controller from "./classes.controller.js";
import withAuth from "../../middleware/authJwt.js";

const router = Router();

/* GET classes listing. */
router.get("/", controller.getClassList);

// POST a new class
router.post("/", withAuth, controller.addNewClass);

// DELETE classes
router.delete("/delete", controller.deleteClasses);

export default router;
