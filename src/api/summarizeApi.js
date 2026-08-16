import api from "./api.js";


export const generateSummaryApi = async (formData) => {
    try {
        const response = await api.post('/summarize', formData);
        return response.data;
    } catch (err) {
        throw err.response?.text || err.message;
    }
};


