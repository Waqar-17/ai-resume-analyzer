"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check initial theme from HTML attribute or localStorage
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);

    // Check auth status
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <nav>
      <Link href="/" className="logo text-primary" style={{ textDecoration: 'none' }}>RESUMIND</Link>
      <div className="nav-links">
        <Link href="/#features">Features</Link>
        <Link href="/pricing">Pricing</Link>
        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
        
        {user ? (
          <>
            <span className="font-medium text-muted text-sm mr-2 hidden md:inline">Hi, {user.name?.split(' ')[0]}</span>
            <Link href="/analyze" className="font-semibold text-fg">Dashboard</Link>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="font-semibold text-fg">Log in</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              Sign up
            </Link>
          </>
        )}

        <button 
          className="theme-toggle ml-2" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
