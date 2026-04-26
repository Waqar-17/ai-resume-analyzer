"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="how" id="how-it-works" style={{ overflow: "hidden" }}>
      <div className="how-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">How it works</div>
          <h2 className="section-title">Four steps to a better resume.</h2>
        </motion.div>
        <motion.div 
          className="steps"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={item} className="step">
            <div className="step-num">1</div>
            <h4>Upload Resume</h4>
            <p>Drop your PDF or DOCX file. We extract text securely on our servers.</p>
          </motion.div>
          <motion.div variants={item} className="step">
            <div className="step-num">2</div>
            <h4>Paste Job Description</h4>
            <p>Add the job description you're targeting for tailored ATS matching.</p>
          </motion.div>
          <motion.div variants={item} className="step">
            <div className="step-num">3</div>
            <h4>AI Analysis</h4>
            <p>Claude analyzes your resume across 5 dimensions in under 10 seconds.</p>
          </motion.div>
          <motion.div variants={item} className="step">
            <div className="step-num">4</div>
            <h4>Act on Feedback</h4>
            <p>Rewrite bullets, fill keyword gaps, and re-analyze until you score 90+.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
