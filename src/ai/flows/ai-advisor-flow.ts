
'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing personalized financial advice to students.
 *
 * - `getFinancialAdvice` - A function that takes a student's question and financial context to return tailored advice.
 * - `FinancialAdviceInput` - The input type for the `getFinancialAdvice` function.
 * - `FinancialAdviceOutput` - The output type for the `getFinancialAdvice` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FinancialAdviceInputSchema = z.object({
  question: z.string().describe("The student's specific question about their finances."),
  monthlyIncome: z.number().describe("The student's total monthly income or allowance."),
  monthlyExpenses: z.number().describe("The student's total spending for the current month."),
  savingsGoalsJSON: z.string().describe("A JSON string representing an array of the student's current savings goals."),
  recentTransactionsJSON: z.string().describe("A JSON string representing an array of the student's most recent transactions."),
});

export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  response: z.string().describe('A helpful, conversational, and actionable response to the student\'s question, formatted as a single string. Use markdown for lists or emphasis.'),
});

export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow(input);
}


const financialAdvicePrompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: { schema: FinancialAdviceInputSchema },
  output: { schema: FinancialAdviceOutputSchema },
  prompt: `You are a friendly and encouraging financial advisor for college students in India. Your name is 'FinBot'.
You are chatting with a student who has asked for financial advice. Use the provided financial context to give a personalized, actionable, and easy-to-understand response.

Keep your answers concise and to the point. If you provide a list, use markdown bullet points.

**Student's Financial Context:**
- Monthly Income/Allowance: ₹{{monthlyIncome}}
- Total Monthly Expenses: ₹{{monthlyExpenses}}
- Savings Goals: {{{savingsGoalsJSON}}}
- Recent Transactions: {{{recentTransactionsJSON}}}

**Student's Question:**
"{{{question}}}"

Based on this, provide a helpful and supportive answer. Address the student directly.
`,
});

const financialAdviceFlow = ai.defineFlow(
  {
    name: 'financialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await financialAdvicePrompt(input);
      return output!;
    } catch (error) {
      console.error('Error in financialAdviceFlow:', error);
      throw new Error('Failed to generate financial advice.');
    }
  }
);

