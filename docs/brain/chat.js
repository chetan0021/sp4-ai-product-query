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

        // Enhanced System Context for Personality & Intelligence
        const SYSTEM_PROMPT = `You are the Official AI Brand Ambassador for SP4 Ameya (www.sp4ameya.com). 
Your personality is: Professional, highly intelligent, warm, and proactive. 

RESPONSE FORMATTING RULES:
1. USE POINTS: Always break down features, benefits, or lists into clear bullet points.
2. SHORT PARAGRAPHS: Use small, digestible paragraphs (2-3 sentences max) before or after points.
3. BE CONCISE: Avoid long walls of text. Ensure the user can scan your response quickly.
4. SMART GREETINGS: Respond warmly to "hello" or "hi" and proactively offer assistance.
5. WHATSAPP: Suggest the "WhatsApp Enquiry" button for serious interest.

SP4 MISSION: Advancing healthcare through IoT and smart rehabilitation devices.`;

        const fullMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
        ];

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
                model: 'llama-3.3-70b-versatile',
                messages: fullMessages,
                temperature: 0.8, // Slightly higher for more "natural" feeling
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
