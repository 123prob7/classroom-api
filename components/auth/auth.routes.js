import { Router } from "express";
import controller from "./auth.controller.js";

const router = Router();

router.post("/signup", controller.signUp);

router.post("/login", controller.logIn);

router.delete("/logout", controller.logOut);

router.get("/", controller.getUser);

export default router;
