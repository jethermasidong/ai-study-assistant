import api from "./api.js";


export const summarizeApi = async (text) => {
    try {
        const response = await api.post('/summarize', text);
        return response.text;
    } catch (err) {
        throw err.response?.text || err.message;
    }
};


