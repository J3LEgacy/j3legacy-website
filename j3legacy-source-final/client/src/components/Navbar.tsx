/*
 * Navbar — Sticky header with transparent-to-solid transition
 * Design: "Tactical Glass" — navy bg on scroll, gold CTA
 * Note: Uses hash-based routing for GitHub Pages compatibility
 * Section anchors use scrollIntoView; service pages use #/services/... links
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#/", section: null },
  { label: "Services", href: null, section: "services" },
  { label: "How It Works", href: null, section: "process" },
  { label: "About", href: null, section: "about" },
  { label: "Reviews", href: null, section: "reviews" },
  { label: "Contact", href: null, section: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileOpen(false);

    if (link.href === "#/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (link.section) {
      // If we're on the home page, scroll directly
      if (location === "/") {
        const el = document.getElementById(link.section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      // If on a service detail page, navigate home first then scroll
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(link.section!);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location === "/") {
      const el = document.getElementById("contact");
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scrolled py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#/"
          className="flex items-center gap-3 no-underline"
          onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="w-10 h-10 rounded-lg bg-[#C9952A] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
              <path d="M8 12h6v12c0 2.5-1.5 4-4 4H8v-4h1c.8 0 1-.4 1-1V12z" fill="#0b2545"/>
              <path d="M16 12h8l-4 7 4 9h-8l3-9-3-7z" fill="#0b2545"/>
              <rect x="26" y="12" width="6" height="4" fill="#0b2545"/>
              <rect x="26" y="19" width="6" height="4" fill="#0b2545"/>
              <rect x="26" y="26" width="6" height="2" fill="#0b2545"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-lg leading-tight tracking-tight">J3 Legacy</div>
            <div className="text-white/60 text-xs font-medium tracking-wide uppercase">Technology Solutions</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href ?? "#"}
              onClick={(e) => handleNavClick(e, link)}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 no-underline cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="btn-cta text-sm py-2.5 px-5 cursor-pointer"
          >
            Book a Free Assessment <ArrowRight size={16} />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0B2545]/98 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <nav className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href ?? "#"}
              onClick={(e) => handleNavClick(e, link)}
              className="text-white/80 hover:text-white text-base font-medium py-2 no-underline transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="btn-cta text-center mt-2 cursor-pointer"
          >
            Book a Free Assessment <ArrowRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
