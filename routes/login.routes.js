import { Router } from "express";
import { login, register, login2, updatePassword } from "../controllers/login.controllers.js";

const router = Router();

router.post("/login/", login);
router.post("/login2/", login2);
router.post("/register/", register);
router.put("/updatePassword/", updatePassword);

export default router;