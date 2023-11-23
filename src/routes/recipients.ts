import express from "express";
import * as RecipientController from "../controllers/recipients";

const router = express.Router();

router.get("/", RecipientController.getRecipients);

export default router;
