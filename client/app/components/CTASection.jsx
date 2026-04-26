"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="cta-section" style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2>Your next interview<br />starts here.</h2>
        <p>Join thousands of job seekers who've improved their ATS score and landed more interviews using RESUMIND.</p>
        <Link href="/analyze" className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.5rem", display: "inline-flex" }}>
          Analyze My Resume Free →
        </Link>
      </motion.div>
    </section>
  );
}
