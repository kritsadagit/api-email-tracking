import express from "express";
import * as SendMailControllers from "../controllers/sendmail";

const router = express.Router();

router.post("/", SendMailControllers.sendMail);

export default router;
