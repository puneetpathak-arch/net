import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function POST(request: Request) {
  if (!process.env.GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY is not set');
    return NextResponse.json(
      { error: 'Server configuration error: GOOGLE_API_KEY is missing' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { spendingData, knownTips } = body;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            suggestions: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  insight: { type: SchemaType.STRING },
                  suggestion: { type: SchemaType.STRING },
                  potentialMonthlySavings: { type: SchemaType.NUMBER },
                },
                required: ["insight", "suggestion", "potentialMonthlySavings"],
              },
            },
          },
          required: ["suggestions"],
        },
      },
    });

    const prompt = `You are a financial advisor for college students in India. Your goal is to provide actionable, personalized savings tips.

Analyze the student's spending habits provided in the JSON spending data.
Based on the data, identify 2-3 specific patterns or areas for potential savings.

Spending Data: ${JSON.stringify(spendingData)}

Known Tips and Tricks: ${JSON.stringify(knownTips)}

For each area, provide:
1.  **insight**: A brief, data-driven observation (e.g., "Your spending on Canteen food is frequent.").
2.  **suggestion**: A practical, actionable tip to reduce that spending (e.g., "Packing lunch from the mess twice a week could cut costs.").
3.  **potentialMonthlySavings**: A realistic, calculated estimate of how much money (in ₹) the student could save per month if they follow the tip.

Generate a JSON object containing an array of 2-3 suggestion objects.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json(JSON.parse(responseText));
  } catch (error: any) {
    console.error('Error in /api/savings-suggestions:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate savings suggestions.',
        details: error.message || 'Unknown error'
      },
      { status: 500 },
    );
  }
}


