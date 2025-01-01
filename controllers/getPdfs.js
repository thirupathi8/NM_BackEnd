import PDF from "../models/pdfSchema.js";

const getPdf = async(req, res) => {
    const { userId } = req.params;
    try {
        const result = await PDF.find({ userId : userId });
        if(!result){
            return res.status(404).json({ message: "No PDFs found" });
        }
        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Retrieval Failed" });
    }
}

export default getPdf;