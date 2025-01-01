import dotenv from "dotenv";
dotenv.config();
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

const extractQues = async (question) => {
    try {
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 100,
            chunkOverlap: 20,
        });
        const output = await textSplitter.createDocuments([question]);

        const splitterList = output.map(doc => doc.pageContent);

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
        return [];
    } catch (error) {
        console.error("Error extracting text embeddings:", error);
        throw error;
    }
};

export default extractQues;