import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    const { question, monthlyIncome, monthlyExpenses, savingsGoalsJSON, recentTransactionsJSON } = body;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a friendly and encouraging financial advisor for college students in India. Your name is 'FinBot'.
You are chatting with a student who has asked for financial advice. Use the provided financial context to give a personalized, actionable, and easy-to-understand response.

Keep your answers concise and to the point. If you provide a list, use markdown bullet points.

**Student's Financial Context:**
- Monthly Income/Allowance: ₹${monthlyIncome}
- Total Monthly Expenses: ₹${monthlyExpenses}
- Savings Goals: ${savingsGoalsJSON}
- Recent Transactions: ${recentTransactionsJSON}

**Student's Question:**
"${question}"

Based on this, provide a helpful and supportive answer. Address the student directly.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Error in /api/financial-advice:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate financial advice.',
        details: error.message || 'Unknown error'
      },
      { status: 500 },
    );
  }
}


