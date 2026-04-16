/*
 * Footer — Dark navy footer with 4-column layout
 * Design: "Tactical Glass" — matches jonesit.tech footer structure
 */
import { Star, Phone, Mail, MapPin } from "lucide-react";

const services = [
  { label: "Managed IT Support", href: "/services/managed-it" },
  { label: "Network Design", href: "/services/network-design" },
  { label: "Hardware Repair", href: "/services/hardware-repair" },
  { label: "Cloud Solutions", href: "/services/cloud-solutions" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "Backup & Recovery", href: "/services/backup-recovery" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#071a33] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C9952A] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <path d="M8 12h6v12c0 2.5-1.5 4-4 4H8v-4h1c.8 0 1-.4 1-1V12z" fill="#0b2545"/>
                  <path d="M16 12h8l-4 7 4 9h-8l3-9-3-7z" fill="#0b2545"/>
                  <rect x="26" y="12" width="6" height="4" fill="#0b2545"/>
                  <rect x="26" y="19" width="6" height="4" fill="#0b2545"/>
                  <rect x="26" y="26" width="6" height="2" fill="#0b2545"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">J3 Legacy</div>
                <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Technology Solutions</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Local, veteran-owned IT partner for Central Florida small businesses. Honest recommendations, no unnecessary upsells.
            </p>
            <div className="flex items-center gap-2 text-[#C9952A] text-sm font-semibold">
              <Star size={14} fill="#C9952A" />
              Veteran-Owned Small Business
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <div className="space-y-4">
              <a href="tel:+14072805106" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors no-underline">
                <Phone size={16} className="text-[#C9952A] flex-shrink-0" />
                (407) 280-5106
              </a>
              <a href="mailto:info@j3legacy.tech" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors no-underline">
                <Mail size={16} className="text-[#C9952A] flex-shrink-0" />
                info@j3legacy.tech
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-[#C9952A] flex-shrink-0 mt-0.5" />
                <span>Central Florida<br />Orlando &middot; Winter Park &middot; Kissimmee<br />& surrounding areas</span>
              </div>
              <div className="text-white/40 text-xs mt-4">
                Mon–Fri: 8AM–6PM<br />
                Sat: 9AM–3PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} J3Legacy Ventures, LLC — DBA J3 Legacy Technology Solutions. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 hover:text-white/60 text-xs no-underline transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/60 text-xs no-underline transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
