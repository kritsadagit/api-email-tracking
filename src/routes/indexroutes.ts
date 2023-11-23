import express from "express";
import * as indexControllers from "../controllers/indexcontrollers";

const router = express.Router();

router.get("/", indexControllers.indexController);

export default router;
