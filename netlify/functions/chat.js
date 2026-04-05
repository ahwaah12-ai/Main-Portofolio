const axios = require('axios');

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);
        const apiKey = process.env.AHMED_WALID; 

        const url = "https://api.groq.com/openai/v1/chat/completions";

        const response = await axios.post(url, {
            model: "llama3-8b-8192", 
            messages: [
                { role: "user", content: message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const botReply = response.data.choices[0].message.content;

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: botReply })
        };

    } catch (error) {
        console.error("Groq Error:", error.response ? error.response.data : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "حدث خطأ في الاتصال بـ Groq API" })
        };
    }
};
