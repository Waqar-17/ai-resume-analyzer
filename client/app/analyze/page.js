"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [bulletToRewrite, setBulletToRewrite] = useState("");
  const [rewrittenBullet, setRewrittenBullet] = useState(null);
  const [rewriting, setRewriting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access the dashboard");
      router.push("/login");
      return;
    }
    fetchHistory(token);
  }, [router]);

  const fetchHistory = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/analyze/history", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      } else {
        console.error("Server returned status:", res.status);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err.message);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRewrite = async () => {
    if (!bulletToRewrite || !jobDescription) {
      toast.error("Please provide a bullet point and ensure Job Description is filled out above");
      return;
    }
    setRewriting(true);
    setRewrittenBullet(null);
    try {
      const res = await fetch("http://localhost:5000/api/analyze/rewrite", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ bulletText: bulletToRewrite, jobDescription })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRewrittenBullet(data);
      toast.success("Bullet point rewritten!");
    } catch (err) {
      toast.error(err.message || "Failed to rewrite bullet");
    } finally {
      setRewriting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      setError("Please provide both a resume (PDF) and a job description.");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      setResults(data.data);
      toast.success("Resume analyzed successfully!");
      fetchHistory(localStorage.getItem("token"));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center p-8">
        {!results && (
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Analyze Your Resume
            </h1>
            <p className="text-muted text-center mb-8">
              Upload your resume and the target job description. Our AI will analyze your fit and provide actionable feedback.
            </p>

            <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-8 shadow-sm">
              <div className="mb-6">
                <label className="block font-semibold mb-2">1. Upload Resume (PDF)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                    <span className="text-4xl mb-2">📄</span>
                    {file ? (
                      <span className="font-medium text-primary">{file.name}</span>
                    ) : (
                      <>
                        <span className="font-medium">Click to upload or drag and drop</span>
                        <span className="text-sm text-muted">PDF only (Max 5MB)</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2">2. Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-48 p-4 rounded-lg border border-border bg-bg focus:outline-none focus:border-primary resize-none"
                  placeholder="Paste the full job description here..."
                ></textarea>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !file || !jobDescription}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Analyzing with AI..." : "Analyze Resume"}
              </button>
            </form>

            {history.length > 0 && (
              <div className="mt-12 w-full">
                <h3 className="font-bold text-xl mb-4 tracking-tight text-fg">Recent Analyses</h3>
                <div className="grid gap-4">
                  {history.map((item, idx) => (
                    <div key={idx} className="bg-surface2 border border-border p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-primary transition-colors" onClick={() => { setResults(item.results); setJobDescription(item.jobDescription); }}>
                      <div>
                        <p className="font-medium text-sm">Score: <span className={item.results.atsScore > 70 ? "text-secondary" : "text-primary"}>{item.results.atsScore}%</span></p>
                        <p className="text-xs text-muted truncate max-w-xs">{item.jobDescription.substring(0, 50)}...</p>
                      </div>
                      <span className="text-xs text-muted">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RESULTS DASHBOARD */}
        {results && (
          <motion.div 
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-black tracking-tight">Analysis Results</h1>
              <button onClick={() => setResults(null)} className="btn-secondary text-sm px-6 py-2 rounded-full font-bold shadow-sm">
                Analyze Another
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* ATS Score Card */}
              <div className="bg-surface border border-border rounded-3xl p-10 shadow-lg col-span-1 flex flex-col items-center sticky top-28 transition-all hover:shadow-xl hover:border-primary/50">
                <h3 className="font-bold text-xl mb-8 tracking-tight text-fg">Overall ATS Match</h3>
                <div className="score-ring mb-4">
                  <svg viewBox="0 0 120 120" width="120" height="120">
                    <circle cx="60" cy="60" r="50" fill="none" className="stroke-border" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      className="stroke-primary"
                      strokeWidth="8"
                      strokeDasharray="314"
                      strokeDashoffset={314 - (314 * results.atsScore) / 100}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                    />
                  </svg>
                  <div className="score-text">
                    <motion.div 
                      className="score-num font-black"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {results.atsScore}%
                    </motion.div>
                  </div>
                </div>
                <p className="text-center text-muted text-sm mt-6 leading-relaxed">
                  {results.feedback}
                </p>
              </div>

              <div className="col-span-2 flex flex-col gap-8">
                {/* Keywords Card */}
                <motion.div 
                  className="bg-surface border border-border rounded-3xl p-8 shadow-md transition-all hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-bold text-xl mb-6 tracking-tight text-fg">Keyword Analysis</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-secondary mb-2">Matched Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.matchedKeywords.length > 0 ? (
                        results.matchedKeywords.map((kw, i) => (
                          <span key={i} className="kw kw-good">{kw} ✓</span>
                        ))
                      ) : (
                        <span className="text-sm text-muted">No matched keywords found.</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords.length > 0 ? (
                        results.missingKeywords.map((kw, i) => (
                          <span key={i} className="kw kw-miss">{kw} ✗</span>
                        ))
                      ) : (
                        <span className="text-sm text-muted">Great job! No major missing keywords.</span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Section Scores Card */}
                <motion.div 
                  className="bg-surface border border-border rounded-3xl p-8 shadow-md transition-all hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-bold text-xl mb-6 tracking-tight text-fg">Section Breakdown</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="bar-row">
                      <div className="bar-label"><span>Tone & Style</span><span>{results.sectionScores.toneAndStyle}/100</span></div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${results.sectionScores.toneAndStyle}%` }}></div></div>
                    </div>
                    <div className="bar-row">
                      <div className="bar-label"><span>Content Quality</span><span>{results.sectionScores.contentQuality}/100</span></div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${results.sectionScores.contentQuality}%` }}></div></div>
                    </div>
                    <div className="bar-row">
                      <div className="bar-label"><span>Structure & Formatting</span><span>{results.sectionScores.structure}/100</span></div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${results.sectionScores.structure}%` }}></div></div>
                    </div>
                    <div className="bar-row">
                      <div className="bar-label"><span>Skills Match</span><span>{results.sectionScores.skillsMatch}/100</span></div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${results.sectionScores.skillsMatch}%` }}></div></div>
                    </div>
                  </div>
                </motion.div>

                {/* AI Rewriter Tool */}
                <motion.div 
                  className="bg-surface border border-border rounded-3xl p-8 shadow-md transition-all hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-bold text-xl mb-2 tracking-tight text-fg flex items-center gap-2">
                    <span className="text-primary">✨</span> AI Bullet Point Rewriter
                  </h3>
                  <p className="text-sm text-muted mb-6">Paste a weak bullet point below to optimize it for this job description.</p>
                  
                  <textarea
                    value={bulletToRewrite}
                    onChange={(e) => setBulletToRewrite(e.target.value)}
                    className="w-full h-24 p-4 rounded-lg border border-border bg-bg focus:outline-none focus:border-primary resize-none text-sm mb-4"
                    placeholder="E.g., Worked on a team to build a website using React."
                  ></textarea>
                  
                  <button 
                    onClick={handleRewrite} 
                    disabled={rewriting || !bulletToRewrite}
                    className="btn-primary w-full disabled:opacity-50 text-sm py-2 mb-6"
                  >
                    {rewriting ? "Rewriting..." : "Optimize Bullet Point"}
                  </button>

                  {rewrittenBullet && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                      <p className="text-sm font-semibold text-fg mb-1">Optimized Result:</p>
                      <p className="text-sm text-fg mb-3">{rewrittenBullet.rewritten}</p>
                      <p className="text-xs text-primary font-medium">Why it's better: {rewrittenBullet.explanation}</p>
                    </div>
                  )}
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
