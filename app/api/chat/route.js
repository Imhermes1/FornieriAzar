import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { messages } = await req.json();

        // Fetch latest auction data
        let auctionContext = '';
        try {
            const auctionRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auction-data`);
            const auctionData = await auctionRes.json();

            auctionContext = `

**Latest Auction Data (${auctionData.melbourne.week}):**
- Melbourne overall clearance rate: ${auctionData.melbourne.clearanceRate}%
- Available suburb data: ${Object.keys(auctionData.suburbs).join(', ')}

When users ask about specific suburbs, use this data to provide helpful insights.
`;
        } catch (error) {
            console.error('Failed to fetch auction data:', error);
        }

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
You are a helpful assistant for Fornieri & Azar, a boutique real estate agency serving East and South East Melbourne, Victoria, Australia.

**Our Focus Areas:**
We specialise in: Malvern East, Chadstone, Vermont South, Blackburn South, Glen Waverley, Berwick, Narre Warren North, Dingley Village, Keysborough, Hampton, and Brighton.

**Your role:**
- Answer real estate questions directly and concisely
- Provide helpful, straightforward information about selling, buying, and market conditions
- Keep responses brief (2-3 sentences max)
- Be friendly and professional

**What you CAN do:**
- Give general market insights using the latest auction data below
- Explain our services (Sales Strategy, Advocacy, Projects, Rentals)
- Answer questions about the selling/buying process
- Provide suburb-specific general advice

**What you CANNOT do:**
- Give specific property valuations (suggest they book an appraisal)
- Provide legal or financial advice (suggest they speak with an agent)
- Make price predictions (offer to connect them with an agent for detailed analysis)

**When to capture leads:**
If someone asks about selling, buying, renting, or appraising a property, offer to have an agent contact them. Ask for their name, phone, and email.

${auctionContext}

Keep it simple, direct, and helpful.
`,
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
