
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { LoginSignupDialog } from '@/components/auth/login-signup-dialog';

export default function LandingPage() {
  useEffect(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href') as string);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.classList.contains('hidden')) {
                navLinks.classList.remove('hidden');
                navLinks.classList.add('flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-white', 'p-4', 'shadow-lg');
            } else {
                navLinks.classList.add('hidden');
            }
        });
    }

  }, []);

  return (
    <div className="bg-white text-gray-800">
      <style jsx global>{`
        /* Landing Page Styles */
        .nav-container {
            @apply max-w-7xl mx-auto flex justify-between items-center;
        }
        .btn-primary-gradient {
            @apply bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-xl font-semibold transition-transform duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)];
        }
      `}</style>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 py-5 px-8 shadow-sm animate-slide-down">
        <div className="nav-container">
          <a href="#" className="flex items-center gap-2 text-2xl font-bold text-indigo-500 no-underline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 animate-float">
              <path d="M20 7h-4v14h-8v-14h-4l8-5 8 5z" />
              <path d="M9 12h6" />
              <path d="M9 16h6" />
            </svg>
            EduFinance
          </a>
          <div className="hidden md:flex gap-8 items-center nav-links">
            <a href="#features" className="text-gray-500 font-medium no-underline transition-colors hover:text-indigo-500">Features</a>
            <a href="#how-it-works" className="text-gray-500 font-medium no-underline transition-colors hover:text-indigo-500">How It Works</a>
            <a href="#testimonials" className="text-gray-500 font-medium no-underline transition-colors hover:text-indigo-500">Reviews</a>
            <LoginSignupDialog>
              <button className="btn-primary-gradient no-underline">Get Started</button>
            </LoginSignupDialog>
          </div>
          <button className="md:hidden bg-none border-none text-2xl text-indigo-500 cursor-pointer mobile-menu-btn">☰</button>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('data:image/svg+xml,%3csvg%20width=%27100%27%20height=%27100%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle%20cx=%2750%27%20cy=%2750%27%20r=%272%27%20fill=%27white%27%20opacity=%270.1%27/%3e%3c/svg%3e')] animate-move-background"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">Master Your Money,<br />Focus on Your Future</h1>
          <p className="text-xl mb-8 opacity-95 animate-fade-in-up" style={{animationDelay: '0.2s'}}>The smart finance web app designed specifically for students. Track expenses, save smarter, and discover scholarships—all in your browser.</p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{animationDelay: '0.4s'}}>
             <LoginSignupDialog>
                <button className="py-4 px-10 rounded-2xl text-lg font-semibold no-underline transition-all inline-flex items-center gap-2 cursor-pointer border-none bg-white text-indigo-500 shadow-lg hover:-translate-y-1 hover:shadow-xl">
                    <span>🚀</span> Launch App
                </button>
            </LoginSignupDialog>
            <a href="#features" className="py-4 px-10 rounded-2xl text-lg font-semibold no-underline transition-all inline-flex items-center gap-2 cursor-pointer border-2 border-white bg-transparent text-white hover:bg-white hover:text-indigo-500">
              Learn More
            </a>
          </div>
          <div className="mt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-2xl animate-float-browser">
              <div className="bg-gray-100 p-3 flex items-center gap-2 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-96 flex items-center justify-center text-white text-6xl">
                💰
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-gray-50" id="features">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Everything You Need to Succeed Financially</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Powerful features designed to help students take control of their finances and build healthy money habits.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">📊</div>
            <h3 className="text-2xl mb-3 text-gray-800">Smart Expense Tracking</h3>
            <p className="text-gray-500 leading-relaxed">Effortlessly log expenses in seconds with our intuitive interface. Categorize spending and see where your money goes.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">🎯</div>
            <h3>Budget Goals</h3>
            <p className="text-gray-500 leading-relaxed">Set monthly budgets and savings goals. Track your progress with beautiful visualizations and stay motivated.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">📈</div>
            <h3>Visual Analytics</h3>
            <p className="text-gray-500 leading-relaxed">Understand your spending patterns with interactive charts and insights. Make data-driven financial decisions.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">🤖</div>
            <h3>AI-Powered Tips</h3>
            <p className="text-gray-500 leading-relaxed">Get personalized saving suggestions based on your spending habits. Let AI help you save smarter.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: '0.5s'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">🎓</div>
            <h3>Scholarship Finder</h3>
            <p className="text-gray-500 leading-relaxed">Discover financial aid opportunities tailored to your profile. Filter by state, income, and category.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: '0.6s'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">🔔</div>
            <h3>Smart Alerts</h3>
            <p className="text-gray-500 leading-relaxed">Stay on track with intelligent notifications when you're approaching budget limits. Never overspend again.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div>
            <h3 className="text-5xl font-extrabold mb-2">50K+</h3>
            <p className="text-lg opacity-90">Active Students</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold mb-2">₹10Cr+</h3>
            <p className="text-lg opacity-90">Money Saved</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold mb-2">5K+</h3>
            <p className="text-lg opacity-90">Scholarships Listed</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold mb-2">4.8⭐</h3>
            <p className="text-lg opacity-90">User Rating</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white" id="how-it-works">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Get Started in 3 Simple Steps</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">Start your journey to financial wellness in minutes</p>
        </div>
        <div className="max-w-5xl mx-auto grid gap-12">
          <div className="flex flex-col md:flex-row gap-8 items-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-extrabold flex-shrink-0">1</div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl mb-2 text-gray-800">Sign Up Securely</h3>
              <p className="text-gray-500 leading-relaxed">Create your account using just your phone number and OTP verification. No lengthy forms, no hassle. Access from any device, anywhere.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-extrabold flex-shrink-0">2</div>
            <div className="text-center md:text-right">
              <h3 className="text-3xl mb-2 text-gray-800">Set Your Budget</h3>
              <p className="text-gray-500 leading-relaxed">Tell us your monthly budget and financial goals. Our smart system will help you stay on track and suggest realistic savings targets.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-extrabold flex-shrink-0">3</div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl mb-2 text-gray-800">Track & Save</h3>
              <p className="text-gray-500 leading-relaxed">Start logging expenses with a single click. Watch your savings grow as our AI provides personalized tips to help you spend smarter.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-gray-50" id="testimonials">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Loved by Students Everywhere</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">See what students are saying about EduFinance</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
            <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-500 leading-relaxed mb-6">"EduFinance completely changed how I manage my money. I saved ₹15,000 in just 3 months! The AI suggestions are spot-on."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">P</div>
              <div>
                <h4 className="text-base text-gray-800 mb-1">Priya Sharma</h4>
                <p className="text-sm text-gray-500">IIT Delhi</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-500 leading-relaxed mb-6">"The scholarship finder is a game-changer! I found 3 scholarships I qualified for but never knew existed. Amazing web app!"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">A</div>
              <div>
                <h4 className="text-base text-gray-800 mb-1">Arjun Patel</h4>
                <p className="text-sm text-gray-500">NIT Trichy</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-gray-500 leading-relaxed mb-6">"Beautiful interface and so easy to use! Works perfectly on my laptop and phone. Finally, a finance app that doesn't feel like homework."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">S</div>
              <div>
                <h4 className="text-base text-gray-800 mb-1">Sneha Reddy</h4>
                <p className="text-sm text-gray-500">BITS Pilani</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center" id="start">
        <h2 className="text-5xl font-extrabold mb-4">Ready to Take Control of Your Finances?</h2>
        <p className="text-xl mb-8 opacity-95">Join thousands of students who are already saving smarter with EduFinance</p>
        <div className="max-w-md mx-auto mb-8 flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3 text-lg">
            <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
            No download required - works in your browser
          </div>
          <div className="flex items-center gap-3 text-lg">
            <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
            Access from any device, anywhere
          </div>
          <div className="flex items-center gap-3 text-lg">
            <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
            Secure and private - your data is protected
          </div>
          <div className="flex items-center gap-3 text-lg">
            <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
            Free to use - start tracking today
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <LoginSignupDialog>
            <button className="py-4 px-10 rounded-2xl text-lg font-semibold no-underline transition-all inline-flex items-center gap-2 cursor-pointer border-none bg-white text-indigo-500 shadow-lg hover:-translate-y-1 hover:shadow-xl">
                <span>🚀</span> Get Started Now
            </button>
          </LoginSignupDialog>
          <button className="py-4 px-10 rounded-2xl text-lg font-semibold no-underline transition-all inline-flex items-center gap-2 cursor-pointer border-2 border-white bg-transparent text-white hover:bg-white hover:text-indigo-500">
            <span>▶️</span> Watch Demo
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-400 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white mb-4 text-lg">EduFinance</h4>
            <p>Your personal guide to financial wellness in college. Accessible from anywhere, on any device.</p>
          </div>
          <div>
            <h4 className="text-white mb-4 text-lg">Product</h4>
            <ul className="list-none">
              <li className="mb-2"><a href="#features" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Features</a></li>
              <li className="mb-2"><a href="#how-it-works" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">How It Works</a></li>
              <li className="mb-2">
                <LoginSignupDialog>
                    <button className="text-gray-400 no-underline transition-colors hover:text-indigo-400 bg-transparent border-none p-0 cursor-pointer text-left">Get Started</button>
                </LoginSignupDialog>
              </li>
              <li><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4 text-lg">Company</h4>
            <ul className="list-none">
              <li className="mb-2"><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Blog</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Careers</a></li>
              <li><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4 text-lg">Legal</h4>
            <ul className="list-none">
              <li className="mb-2"><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 no-underline transition-colors hover:text-indigo-400">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2026 EduFinance. All rights reserved. Made with 💜 for students.</p>
        </div>
      </footer>
    </div>
  );
}

    