import { NextResponse } from 'next/server';
import { getFinancialAdvice } from '@/ai/flows/ai-advisor-flow';

export async function POST(request: Request) {
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


