# EduFinance - Student Financial Wellness App

EduFinance is a Next.js web application designed to help Indian college students manage their finances effectively. It provides tools for expense tracking, budget planning, goal setting, and discovering scholarships, all tailored to the student lifestyle. All user data is securely stored and managed using Firebase.

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).

## Problem Statement

College students in India often struggle with managing their finances, from daily expenses like mess and canteen bills to larger costs like rent and exam fees. This financial stress can impact their academic performance and well-being. Generic expense tracking apps are often too complex, not tailored to student-specific needs, and lack crucial local context like scholarship opportunities and fee reminders.

## Features

- **Secure Authentication**: Safe and secure user login and signup using Firebase Authentication.
- **Persistent Data Storage**: All user data, including expenses, goals, and budgets, is securely stored in a personal Firestore database.
- **Dashboard Overview**: A central hub to view your current spending against your monthly budget, track savings goals, and see recent transactions.
- **Financial Health Score**: A gamified score (1-100) that gives you a quick snapshot of your financial habits based on spending discipline, savings rate, and consistency.
- **Expense Tracking**: Easily log expenses with predefined student-centric categories.
- **Budget & Goal Planning**: Set monthly budgets (overall and per-category) and define short-term savings goals with visual progress tracking.
- **Visual Analytics**: Interactive charts to visualize spending patterns, including category-wise breakdowns and weekly spending trends.
- **AI-Powered Intelligence**:
    - **AI Savings Suggestions**: Get personalized savings tips based on your spending habits.
    - **AI Financial Advisor**: A conversational chatbot that provides tailored financial advice based on your real-time financial context.
- **Scholarship Directory**: A filterable list of relevant national and state-level scholarships and schemes to help manage educational expenses.
- **Responsive Design**: A mobile-first interface that works beautifully on all devices.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript
- **Backend & Database**: Firebase (Authentication, Firestore)
- **Generative AI**: Google AI (via Genkit)
- **Charts**: Recharts
- **Deployment**: Firebase App Hosting

This stack was chosen for its rapid development capabilities, excellent performance, and suitability for building a full-stack application quickly.

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm
- A Firebase project

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd edufinance
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    ```
5. **Configure Firebase**: Open the `src/firebase/config.ts` file and replace the placeholder `firebaseConfig` object with the configuration from your own Firebase project. You can find this in your Firebase project settings.

### Running the Development Server

To run the app and the AI backend concurrently, you'll need two terminals.

**Terminal 1: Run the Next.js app**

```bash
npm run dev
```
This will start the web application on [http://localhost:9002](http://localhost:9002).

**Terminal 2: Run the Genkit AI backend**

```bash
npm run genkit:watch
```
This will start the local Genkit development server, which the Next.js app will call for AI features.

## Folder Structure

```
.
├── src
│   ├── app
│   │   ├── (main)          # Route group for pages with the main app layout
│   │   │   ├── dashboard
│   │   │   ├── scholarships
│   │   │   └── layout.tsx  # Main layout with sidebar and header
│   │   ├── page.tsx        # Login/Landing page
│   │   └── layout.tsx      # Root layout
│   ├── components
│   │   ├── dashboard       # Components specific to the dashboard
│   │   ├── ui              # Reusable shadcn/ui components
│   │   └── ...             # Other shared components
│   ├── lib
│   │   ├── data.ts         # Mock/static data for the application
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── utils.ts
│   ├── firebase
│   │   ├── config.ts       # Firebase project configuration
│   │   ├── index.ts        # Firebase initialization
│   │   └── ...
│   ├── services
│   │   └── firestore.ts    # Functions for interacting with Firestore
│   ├── ai
│   │   ├── flows           # Genkit AI flows
│   │   └── genkit.ts
└── ...
```
