import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

const extractPdf = async (pdfUrl) => {
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfText = "";
    docs.forEach(doc => {
        pdfText = pdfText + doc.pageContent;
    })

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 20,
    });
    const output = await textSplitter.createDocuments([pdfText]);

    let splitterList = [];
    output.forEach(doc => {
        splitterList.push(doc.pageContent);
    })

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
    });

    if (splitterList.length > 0) {
        const result = await embeddings.embedDocuments(splitterList);

        const combinedResult = splitterList.map((textSnippet, index) => ({
            textSnippet,
            embedding: result[index]
        }));

        return combinedResult;
    }
    return;
};

export default extractPdf;