import { NextResponse } from 'next/server';
import { getFinancialAdvice } from '@/ai/flows/ai-advisor-flow';

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
    const advice = await getFinancialAdvice(body);
    return NextResponse.json(advice);
  } catch (error) {
    console.error('Error in /api/financial-advice:', error);
    return NextResponse.json(
      { error: 'Failed to generate financial advice.' },
      { status: 500 },
    );
  }
}


