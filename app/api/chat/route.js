import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid messages format" },
                { status: 400 }
            );
        }

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
You are an assistant for a Melbourne real estate agency.
You answer only real estate related questions.
You work for Fornieri Real Estate in Victoria, Australia.
You do not give legal or financial advice, instead you suggest the user speak with the agent.
When the user sounds like they want to sell, buy, lease or appraise, invite them to share their name, phone and email so an agent can contact them.
Keep answers concise and friendly.
        `.trim(),
                },
                ...messages,
            ],
            temperature: 0.4,
        });

        const reply = completion.choices[0]?.message;
        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Chat API error", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
