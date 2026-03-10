export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { messages } = await req.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Groq API Key not configured on server' }), { status: 500 });
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
