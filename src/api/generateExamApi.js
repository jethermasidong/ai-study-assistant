import api from "./api.js";


export const generateExamApi = async (formData) => {
    try {
        const response = await api.post('/examination', formData);
        return response.data;
    } catch (err) {
        throw err.response || err.message;
    }
};


