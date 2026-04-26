"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <div className="hero">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="hero-badge">
            <span></span> AI-Powered Career Intelligence
          </div>
          <h1>
            Beat the ATS.<br />
            <em>Land the Interview.</em>
          </h1>
          <p className="hero-desc">
            Analyze your resume against any job description in seconds. Get an ATS score, keyword gaps, section-by-section feedback, and AI rewrite suggestions — all powered by Claude.
          </p>
          <div className="hero-actions">
            <Link href="/analyze" className="btn-primary">
              📄 Analyze My Resume <span>→</span>
            </Link>
            <Link href="#demo" className="btn-secondary">
              ▶ Watch Demo
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">75%</div>
              <div className="stat-label">
                Resumes rejected by ATS<br />
                before human review
              </div>
            </div>
            <div className="stat">
              <div className="stat-num">3s</div>
              <div className="stat-label">
                Average time to get<br />
                your full analysis
              </div>
            </div>
            <div className="stat">
              <div className="stat-num">5+</div>
              <div className="stat-label">
                Feedback dimensions<br />
                analyzed per resume
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="mockup-card">
            <div className="mockup-score">
              <div className="score-ring">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    className="stroke-border"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="8"
                    strokeDasharray="314"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 314 }}
                    animate={{ strokeDashoffset: 75 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="score-text">
                  <motion.div 
                    className="score-num"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    78
                  </motion.div>
                  <div className="score-sub">ATS SCORE</div>
                </div>
              </div>
            </div>
            <div className="mockup-label">Keyword Match</div>
            <div className="keyword-row">
              <span className="kw kw-good">React ✓</span>
              <span className="kw kw-good">TypeScript ✓</span>
              <span className="kw kw-good">Node.js ✓</span>
              <span className="kw kw-miss">GraphQL ✗</span>
              <span className="kw kw-miss">AWS ✗</span>
              <span className="kw kw-miss">Docker ✗</span>
            </div>
            <div className="mockup-label">Section Scores</div>
            <div className="bar-row">
              <div className="bar-label">
                <span>Tone & Style</span>
                <span>82/100</span>
              </div>
              <div className="bar-track">
                <motion.div 
                  className="bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-label">
                <span>Content Quality</span>
                <span>74/100</span>
              </div>
              <div className="bar-track">
                <motion.div 
                  className="bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: "74%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-label">
                <span>Structure</span>
                <span>90/100</span>
              </div>
              <div className="bar-track">
                <motion.div 
                  className="bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </div>
            <div className="bar-row">
              <div className="bar-label">
                <span>Skills Match</span>
                <span>65/100</span>
              </div>
              <div className="bar-track">
                <motion.div 
                  className="bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
