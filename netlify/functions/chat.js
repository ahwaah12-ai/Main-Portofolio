const axios = require('axios');

exports.handler = async (event, context) => {
    // 1. التأكد إن الطلب جاي بـ POST (زي ما بيحصل في البوت عندك)
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Method Not Allowed" }) 
        };
    }

    try {
        // 2. استلام الرسالة من الـ Frontend
        const { message } = JSON.parse(event.body);

        // 3. استدعاء الـ API Key من Netlify Environment Variables
        const apiKey = process.env.AHMED_WALID;

        // 4. الاتصال بـ OpenAI (كمثال)
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // 5. إرجاع الرد للمتصفح
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                reply: response.data.choices[0].message.content 
            }),
        };

    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي" }),
        };
    }
};
