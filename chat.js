const axios = require('axios');

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const API_KEY = process.env.GROQ_API_KEY;

        if (!API_KEY) {
            return { statusCode: 500, body: JSON.stringify({ error: "API Key missing!" }) };
        }

        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3-8b-8192",
            messages: messages,
            temperature: 0.5
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to connect to Groq" })
        };
    }
};