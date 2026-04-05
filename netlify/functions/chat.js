const axios = require('axios');

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);
        const apiKey = process.env.AHMED_WALID;

        if (!apiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: "API Key is missing!" }) };
        }

        const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama3-8b-8192",
            messages: messages,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000 // استنى 10 ثواني قبل ما يفصل
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response.data) // نبعت الداتا زي ما هي لـ OpenAI format
        };

    } catch (error) {
        console.error("LOG:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
