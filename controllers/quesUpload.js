import QA from "../models/qaSchema.js";
import extractQues from "./readQues.js";
import findAns from "./findAns.js";
import formatAns from "./formatAns.js";

const handleAddQa = async (req, res) => {
    const { userId, pdfId, question } = req.body;

    try {
        const extracted = await extractQues(question);
        // console.log(extracted);
        const unformattedAnswer = await findAns(pdfId, extracted);
        const PROMPT = "For the give question " + question + " and with the given content as answer, please give appropriate answer in HTML format (Do not include any heading tags) without any warnings about the content in the result. The answer content is " + unformattedAnswer;
        const answer = await formatAns(PROMPT);
        const newQa = new QA({
            userId: userId,
            pdfId: pdfId,
            question: extracted,
            answer: answer,
        });
        await newQa.save();

        res.setHeader('Content-Disposition', 'attachment; filename="answer.txt"');
        res.setHeader('Content-Type', 'text/plain');
        res.send(answer);

        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading" });
        return;
    }
}

export default handleAddQa;