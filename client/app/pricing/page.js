"use client";

import Navbar from "../components/Navbar";
import CTASection from "../components/CTASection";
import { motion } from "framer-motion";

export default function PricingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center">
        <motion.div 
          className="w-full max-w-4xl flex flex-col items-center text-center mb-16 mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag mb-4">Pricing</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 mt-4 leading-tight">
            Simple plans for <br className="hidden md:block" /><span className="text-primary">serious job seekers.</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mt-4">
            Get unlimited resume analyses, intelligent keyword tracking, and AI rewrites to land your dream job faster.
          </p>
        </motion.div>

        <motion.div 
          className="pricing-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Free Plan */}
          <motion.div variants={cardVariants} className="pricing-card bg-surface2 border border-border hover:border-primary/50 hover:shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-fg">Basic</h3>
            <p className="text-muted mb-6">Perfect to try out the platform.</p>
            <div className="text-5xl font-black mb-8 text-fg">$0<span className="text-lg text-muted font-medium">/mo</span></div>
            
            <ul className="space-y-4 mb-10 flex-1 text-fg">
              <li className="flex gap-3 items-center">
                <span className="text-muted">✓</span> 
                <span className="font-medium text-muted">3 Resume Analyses / month</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-muted">✓</span> 
                <span className="font-medium text-muted">Basic ATS Score</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-muted">✓</span> 
                <span className="font-medium text-muted">Keyword Gap Detection</span>
              </li>
            </ul>
            
            <button className="btn-secondary w-full justify-center mt-auto py-3 text-lg rounded-xl">Get Started Free</button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div variants={cardVariants} className="pricing-card bg-surface border border-primary shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.25)]">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary opacity-10 rounded-full blur-3xl"></div>
            
            <div className="flex justify-between items-center mb-2 mt-2">
              <h3 className="text-2xl font-bold text-fg">Pro</h3>
              <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Most Popular
              </div>
            </div>
            
            <p className="text-muted mb-6">Everything you need to land the interview.</p>
            <div className="text-5xl font-black mb-8 text-fg">$12<span className="text-lg text-muted font-medium">/mo</span></div>
            
            <ul className="space-y-4 mb-10 flex-1 text-fg">
              <li className="flex gap-3 items-center">
                <span className="text-primary font-bold">✓</span> 
                <span className="font-medium text-fg">Unlimited Resume Analyses</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-primary font-bold">✓</span> 
                <span className="font-medium text-fg">AI Bullet Point Rewriter</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-primary font-bold">✓</span> 
                <span className="font-medium text-fg">Chat With Your Resume</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-primary font-bold">✓</span> 
                <span className="font-medium text-fg">Detailed Section Feedback</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-primary font-bold">✓</span> 
                <span className="font-medium text-fg">Priority AI Processing</span>
              </li>
            </ul>
            
            <button className="btn-primary w-full justify-center mt-auto py-3 text-lg rounded-xl shadow-lg shadow-primary/20">Upgrade to Pro</button>
          </motion.div>
        </motion.div>
      </main>
      <CTASection />
    </>
  );
}
