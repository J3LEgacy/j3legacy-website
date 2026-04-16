/*
 * Navbar — Sticky header with transparent-to-solid transition
 * Design: "Tactical Glass" — navy bg on scroll, gold CTA
 * Handles hash navigation from both home and service detail pages
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
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

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    if (href === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");

      // If we're already on the home page, just scroll
      if (location === "/") {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // If on another page, navigate home then scroll after render
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scrolled py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/#contact");
            }}
            className="btn-cta text-sm py-2.5 px-5"
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
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-white/80 hover:text-white text-base font-medium py-2 no-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/#contact");
            }}
            className="btn-cta text-center mt-2"
          >
            Book a Free Assessment <ArrowRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
