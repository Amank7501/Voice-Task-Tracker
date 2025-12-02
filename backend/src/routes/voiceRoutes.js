import express from "express";
import { parseVoice } from "../controllers/voiceController.js";

const router = express.Router();

router.post("/parse", parseVoice);

export default router;
