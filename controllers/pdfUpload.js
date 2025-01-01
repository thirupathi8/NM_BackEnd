import PDF from "../models/pdfSchema.js";
import extractPdf from "./readPdf.js";

const handleAddPdf = async (req, res) => {
    const { userId, title, fileUrl } = req.body;

        try {
            const extracted = await extractPdf(fileUrl);
            const newPdf = new PDF({
                userId: userId,
                title: title,
                fileURL: fileUrl,
                extractedContent: extracted,
            })
            await newPdf.save();

            res.status(200).json({message: "PDF uploaded successfully"});
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Error uploading"});
            return;
        }
}

export default handleAddPdf;