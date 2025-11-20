// API route for buyer registration with Notion integration
import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, email, phone, suburbs, budget, propertyType, source } = await req.json();

        // Validate required fields
        if (!name || !email || !phone || !suburbs || !budget || !propertyType) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Initialize Notion client
        const notion = new Client({
            auth: process.env.NOTION_API_KEY,
        });

        // Add to Notion database
        await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_BUYER_DATABASE_ID,
            },
            properties: {
                'Full Name': {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                'Email': {
                    email: email,
                },
                'Phone': {
                    phone_number: phone,
                },
                'Suburb/s': {
                    rich_text: [
                        {
                            text: {
                                content: suburbs,
                            },
                        },
                    ],
                },
                'Budget': {
                    multi_select: [
                        {
                            name: budget,
                        },
                    ],
                },
                'Property Type': {
                    multi_select: [
                        {
                            name: propertyType,
                        },
                    ],
                },
            },
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Buyer registration error:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    }
}
