import PDF from "../models/pdfSchema.js";

/**
 * Calculate the cosine similarity between two vectors.
 * @param {Array} vecA - First vector.
 * @param {Array} vecB - Second vector.
 * @returns {number} - Cosine similarity value.
 */
const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val ** 2, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Find the most similar text snippet from the PDF based on embeddings.
 * @param {string} pdfId - The ID of the PDF to search.
 * @param {Array} questionEmbeddings - The embeddings of the question.
 * @returns {string} - The text snippet that is most similar to the question.
 */

const findAns = async (pdfId, questionEmbeddings) => {
    try {
        const pdf = await PDF.findById(pdfId);
        if (!pdf) {
            throw new Error("PDF not found");
        }

        const { extractedContent } = pdf;

        let bestMatch = null;
        let highestSimilarity = -1;

        extractedContent.forEach(({ textSnippet, embedding }) => {
            questionEmbeddings.forEach(({ embedding: questionEmbedding }) => {
                const similarity = cosineSimilarity(embedding, questionEmbedding);

                if (similarity > highestSimilarity) {
                    highestSimilarity = similarity;
                    bestMatch = textSnippet;
                }
            });
        });

        return bestMatch || "No matching content found.";
    } catch (error) {
        console.error("Error finding the answer:", error);
        throw error;
    }
};

export default findAns;