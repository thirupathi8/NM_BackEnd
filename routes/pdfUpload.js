import express from "express";
import handleAddPdf from "../controllers/pdfUpload.js";
import getPdf from "../controllers/getPdfs.js";

const router = express.Router();

router.post("/add-pdf", handleAddPdf);
router.get("/get-pdfs/:userId", getPdf);

export default router;