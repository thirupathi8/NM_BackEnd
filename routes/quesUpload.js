import handleAddQa from "../controllers/quesUpload.js";
import express from "express";

const router = express.Router();

router.post("/add-q", handleAddQa)

export default router