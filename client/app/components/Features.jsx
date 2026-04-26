"use client";

import { motion } from "framer-motion";

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="features" id="features" style={{ overflow: "hidden" }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag">Features</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "end" }}>
          <div>
            <h2 className="section-title">Everything you need to get hired.</h2>
          </div>
          <p className="section-desc" style={{ marginBottom: "3rem" }}>
            From ATS scoring to bullet rewrites — every feature is designed to turn your resume into an interview magnet.
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="features-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={item} className="feat-card">
          <div className="feat-icon">📊</div>
          <h3>ATS Score & Analysis</h3>
          <p>Get a 0–100 compatibility score with instant breakdown of what ATS systems look for and how you rank.</p>
        </motion.div>
        <motion.div variants={item} className="feat-card">
          <div className="feat-icon">🔍</div>
          <h3>Keyword Gap Detection</h3>
          <p>Paste any job description and see exactly which keywords you have and which ones you're missing.</p>
        </motion.div>
        <motion.div variants={item} className="feat-card">
          <div className="feat-icon">✏️</div>
          <h3>Bullet Point Rewriter</h3>
          <p>Click any weak bullet — Claude rewrites it with strong action verbs, metrics, and STAR format instantly.</p>
        </motion.div>
        <motion.div variants={item} className="feat-card">
          <div className="feat-icon">📉</div>
          <h3>Skills Gap Analysis</h3>
          <p>Side-by-side comparison of your skills vs job requirements. Know exactly what to add.</p>
        </motion.div>
        <motion.div variants={item} className="feat-card">
          <div className="feat-icon">💬</div>
          <h3>Chat With Resume</h3>
          <p>Ask AI questions about your resume: "What's missing for a senior role?" and get smart, contextual answers.</p>
        </motion.div>
        <motion.div variants={item} className="feat-card">
          <div className="feat-icon">🏆</div>
          <h3>Section Feedback</h3>
          <p>Detailed scoring and tips for Summary, Experience, Education, Skills, and Projects sections.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
