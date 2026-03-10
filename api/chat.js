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

RULES FOR INTELLIGENCE:
1. GREETINGS: If the user says "hello", "hi", or similar, respond warmly and smartly. Mention that you are ready to help them explore SP4's healthcare innovations. Don't just be a robot; be a conversational partner.
2. PRODUCT KNOWLEDGE: You have deep knowledge of SP4 products (Vital Step, Dental Bite Force, Foot Pressure, Hand Grip, etc.). When asked about products, provide insightful, value-driven information. 
3. SMART THINKING: Don't give "canned" responses. Connect ideas. If a user asks about rehabilitation, suggest looking at both Hand Grip and Foot Pressure solutions.
4. WHATSAPP INTEGRATION: If a user seems very interested in a product or wants to "purchase", "enquire", or "talk to a human", encourage them to use the "Enquire on WhatsApp" feature provided in the UI. 
5. TONE: Clinical yet accessible. You represent a high-end MedTech firm. 
6. CONCISENESS: Be brilliant but brief. 

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
