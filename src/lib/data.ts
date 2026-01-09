
import type { User, Scholarship, Tip, Notification } from './types';
import { ShieldCheck, ShoppingCart, UtensilsCrossed, BookOpen, Coffee } from 'lucide-react';

export const user: User = {
  name: 'Rohan Sharma',
  college: 'IIT Delhi',
  avatarUrl: 'https://picsum.photos/seed/100/100/100',
};

export const tips: Tip[] = [
  {
    id: 't1',
    text: 'Always ask for a student discount when shopping, even for online subscriptions.',
    icon: ShieldCheck,
  },
  {
    id: 't2',
    text: 'Review your monthly subscriptions. Cancel any you haven\'t used in the last month.',
    icon: ShoppingCart,
  },
  {
    id: 't3',
    text: 'Try to eat most of your meals from the mess. It\'s almost always cheaper than the canteen or outside.',
    icon: UtensilsCrossed,
  },
  {
    id: 't4',
    text: 'Buy used textbooks or use the library instead of purchasing new ones for every course.',
    icon: BookOpen,
  },
  {
      id: 't5',
      text: 'Limit expensive coffee habits. Making your own can save you a significant amount over a semester.',
      icon: Coffee,
  }
];

export const scholarships: Scholarship[] = [
    {
        id: 's1',
        name: 'Post Matric Scholarship for SC Students',
        provider: 'Ministry of Social Justice & Empowerment',
        amount: 'Upto ₹13,500 p.a.',
        deadline: '2026-10-31',
        eligibility: {
            state: ['All India'],
            category: ['SC'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://scholarships.gov.in/pms-sc-gj/pms-sc-help.html'
    },
    {
        id: 's2',
        name: 'Merit Cum Means Scholarship for Professional and Technical Courses',
        provider: 'Ministry of Minority Affairs',
        amount: '₹20,000 p.a. + Fees',
        deadline: '2026-10-31',
        eligibility: {
            state: ['All India'],
            category: ['Minority'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://scholarships.gov.in/'
    },
    {
        id: 's3',
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        provider: 'Government of Madhya Pradesh',
        amount: 'Full Course Fee',
        deadline: '2026-07-31',
        eligibility: {
            state: ['Madhya Pradesh'],
            category: ['General', 'OBC', 'SC', 'ST'],
        },
        link: 'http://scholarshipportal.mp.nic.in/MMVY/HomePage.aspx'
    },
     {
        id: 's4',
        name: 'Pragati Scholarship for Girl Students',
        provider: 'AICTE',
        amount: '₹50,000 p.a.',
        deadline: '2026-11-30',
        eligibility: {
            state: ['All India'],
            category: ['Girl Students'],
        },
        link: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati-Saksham-Scholarship-Scheme'
    },
    {
        id: 's5',
        name: 'Chief Minister\'s Scholarship Scheme',
        provider: 'Government of Haryana',
        amount: 'Upto ₹12,000 p.a.',
        deadline: '2026-11-30',
        eligibility: {
            state: ['Haryana'],
            category: ['General', 'SC', 'OBC'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://harchhatravratti.highereduhry.ac.in/'
    }
];

export const notifications: Notification[] = []

// Keep initial goals for demonstration purposes, they will be fetched from Firestore
export { goals } from './initial-data';
