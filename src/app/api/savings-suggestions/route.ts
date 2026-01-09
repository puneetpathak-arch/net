import { NextResponse } from 'next/server';
import { getSavingsSuggestions } from '@/ai/flows/ai-savings-suggestions';

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
    const result = await getSavingsSuggestions(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/savings-suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate savings suggestions.' },
      { status: 500 },
    );
  }
}


