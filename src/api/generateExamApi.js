import api from "./api.js";


export const generateExamApi = async (text, questionCount, difficulty, questionTypes) => {
    try {
        const response = await api.post('/examination', {
            text,
            questionCount,
            difficulty,
            questionTypes
        });
        return response.text;
    } catch (err) {
        throw err.response || err.message;
    }
};


