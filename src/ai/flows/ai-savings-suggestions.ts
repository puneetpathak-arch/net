
'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing AI-powered savings suggestions to students based on their spending habits.
 *
 * - `getSavingsSuggestions` -  A function that takes a student's spending data as input and returns personalized savings suggestions.
 * - `SavingsSuggestionsInput` - The input type for the `getSavingsSuggestions` function.
 * - `SavingsSuggestionsOutput` - The output type for the `getSavingsSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Expense } from '@/lib/types';

const SavingsSuggestionsInputSchema = z.object({
  spendingData: z.custom<Expense[]>().describe("An array of the student's recent expense objects."),
  knownTips: z.array(z.string()).describe('An array of generic saving tips to provide context.'),
});

export type SavingsSuggestionsInput = z.infer<typeof SavingsSuggestionsInputSchema>;

const SuggestionSchema = z.object({
  insight: z.string().describe("A short, insightful summary of a spending pattern. E.g., 'You're spending a lot on canteens.'"),
  suggestion: z.string().describe("An actionable suggestion based on the insight. E.g., 'Try cooking 2 meals a week to save.'"),
  potentialMonthlySavings: z.number().describe('An estimated amount in ₹ that could be saved per month by following the suggestion.'),
});
export type Suggestion = z.infer<typeof SuggestionSchema>;


const SavingsSuggestionsOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe('An array of 2-3 personalized savings suggestions for the student.'),
});

export type SavingsSuggestionsOutput = z.infer<typeof SavingsSuggestionsOutputSchema>;

export async function getSavingsSuggestions(input: SavingsSuggestionsInput): Promise<SavingsSuggestionsOutput> {
  return savingsSuggestionsFlow(input);
}

const savingsSuggestionsPrompt = ai.definePrompt({
  name: 'savingsSuggestionsPrompt',
  input: {schema: SavingsSuggestionsInputSchema},
  output: {schema: SavingsSuggestionsOutputSchema},
  prompt: `You are a financial advisor for college students in India. Your goal is to provide actionable, personalized savings tips.

Analyze the student's spending habits provided in the JSON spending data.

Based on the data, identify 2-3 specific patterns or areas for potential savings.

For each area, provide:
1.  **insight**: A brief, data-driven observation (e.g., "Your spending on Canteen food is frequent.").
2.  **suggestion**: A practical, actionable tip to reduce that spending (e.g., "Packing lunch from the mess twice a week could cut costs.").
3.  **potentialMonthlySavings**: A realistic, calculated estimate of how much money (in ₹) the student could save per month if they follow the tip.

Also consider the contextual knownTips to guide your suggestions.

Spending Data: {{{jsonEncode spendingData}}}

Known Tips and Tricks: {{{jsonEncode knownTips}}}

Generate a JSON object containing an array of 2-3 suggestion objects.
`,
});

const savingsSuggestionsFlow = ai.defineFlow(
  {
    name: 'savingsSuggestionsFlow',
    inputSchema: SavingsSuggestionsInputSchema,
    outputSchema: SavingsSuggestionsOutputSchema,
  },
  async input => {
    try {
      const {output} = await savingsSuggestionsPrompt(input);
      return output!;
    } catch (error) {
      console.error('Error in savingsSuggestionsFlow:', error);
      // Re-throw a more user-friendly error or a specific error type
      throw new Error('Failed to generate savings suggestions due to an internal error.');
    }
  }
);

    