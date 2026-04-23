/*
 * Home Page — J3 Legacy Technology Solutions
 * Design: "Tactical Glass" — matching jonesit.tech aesthetic
 * Sections: Hero, Pain Points, Industries, 3-Step Process,
 *           Services Carousel, Value Prop, About, Reviews, Contact, Footer
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield, Wifi, Server, Cloud, HardDrive, DatabaseBackup, Star, ChevronRight, Phone, Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ============================================================
   IMAGE URLS
   ============================================================ */
const IMAGES = {
  teamCollab: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/hero-team-collab-2PqPtUdYpzrQTeLHdMA8S5.webp",
  itPro: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/hero-it-professional-EP2H3q4n4C7ZHQZQczPY4X.webp",
  contactBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/contact-bg-n5NJKFcH4XvJSNzPxBRiAg.webp",
  medicalOffice: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/hero-medical-office-ed3SBBkf6Bwk3BYPjURfp7.webp",
  // Unsplash for secondary areas
  cybersecurity: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
  networkRoom: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  cloudServer: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  backup: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  officeWork: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
};

/* ============================================================
   SERVICES DATA
   ============================================================ */
const services = [
  {
    icon: Server,
    title: "Managed IT Support",
    desc: "Proactive monitoring, helpdesk, and on-site support that keeps your business running without interruption. We handle IT so you can focus on patients, clients, and growth.",
    image: IMAGES.teamCollab,
    href: "#/services/managed-it",
  },
  {
    icon: Wifi,
    title: "Network Design",
    desc: "Enterprise-grade network architecture for small businesses. VLANs, UniFi deployments, Wi-Fi optimization, and secure guest networks — built right the first time.",
    image: IMAGES.networkRoom,
    href: "#/services/network-design",
  },
  {
    icon: HardDrive,
    title: "Hardware Repair",
    desc: "PC and Mac repair, SSD upgrades, RAM installs, and component-level diagnostics. We extend the life of your equipment and keep your team productive.",
    image: IMAGES.officeWork,
    href: "#/services/hardware-repair",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Microsoft 365 migrations, cloud backup, and hybrid infrastructure. We move your business to the cloud securely — with zero downtime and full training.",
    image: IMAGES.cloudServer,
    href: "#/services/cloud-solutions",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Endpoint protection, email security, MFA deployment, and security awareness training. We protect your business from ransomware, phishing, and data breaches.",
    image: IMAGES.cybersecurity,
    href: "#/services/cybersecurity",
  },
  {
    icon: DatabaseBackup,
    title: "Backup & Recovery",
    desc: "Automated local and cloud backups with tested disaster recovery plans. When the worst happens, we get you back online fast — guaranteed.",
    image: IMAGES.backup,
    href: "#/services/backup-recovery",
  },
];

/* ============================================================
   INDUSTRIES DATA
   ============================================================ */
const industries = [
  { icon: "🏥", label: "Medical & Dental Practices" },
  { icon: "👁️", label: "Optometry Offices" },
  { icon: "⚖️", label: "Law Firms" },
  { icon: "🏠", label: "Real Estate Offices" },
  { icon: "🛡️", label: "Insurance Agencies" },
  { icon: "🏋️", label: "Physical Therapy & Chiropractic" },
];

/* ============================================================
   PAIN POINTS
   ============================================================ */
const painPoints = [
  "Slow response times from your current IT provider",
  "Recurring network outages that disrupt patient care or client work",
  "Security vulnerabilities you know exist but haven't addressed",
  "No clear plan for data backup or disaster recovery",
  "Technology decisions made without your business goals in mind",
  "Surprise invoices and unclear billing from IT vendors",
];

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const testimonials = [
  {
    text: "My laptop was running so slow I thought it was done for. J3 Legacy fixed it in a few hours, explained exactly what they did, and charged less than what Geek Squad wanted just to look at it. I'll never go anywhere else.",
    author: "Margaret T.",
    location: "Orlando, FL",
    initial: "M",
  },
  {
    text: "As a veteran myself, I love supporting a fellow vet's business. But honestly, I'd recommend J3 Legacy to anyone. He came to my house, fixed my Wi-Fi issues, and walked me through what he was doing the whole time. Real integrity.",
    author: "Robert K.",
    location: "Winter Park, FL",
    initial: "R",
  },
  {
    text: "My mom is 74 and was getting scam pop-ups constantly. J3 Legacy came to her place, cleaned everything up, taught her how to recognize future scams, and was so patient and kind with her. She felt empowered, not embarrassed.",
    author: "Linda S.",
    location: "Ocoee, FL",
    initial: "L",
  },
];

/* ============================================================
   HOME COMPONENT
   ============================================================ */
export default function Home() {
  useScrollAnimation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (formRef.current) formRef.current.reset();
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============================================================
         HERO SECTION
         ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #e8eef5 0%, #dce6f0 30%, #edf2f7 70%, #f0f4f8 100%)" }}>
        <ParticleBackground />
        <div className="container relative z-10 pt-28 pb-16">
          <div className="max-w-3xl">
            {/* Veteran Badge */}
            <div className="fade-down inline-flex items-center gap-2 bg-[#0B2545]/8 border border-[#0B2545]/15 rounded-full px-4 py-2 mb-8">
              <Star size={14} className="text-[#C9952A]" fill="#C9952A" />
              <span className="text-[#0B2545] text-sm font-semibold">Veteran-Owned Business — Central Florida</span>
            </div>

            {/* Headline with Boxed Keywords */}
            <h1 className="fade-up text-[#0B2545] text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.1] mb-6">
              Stop Losing Time To{" "}
              <span className="boxed-keyword-orange">IT Chaos.</span>
              <br />
              <span className="mt-2 block">Get Back To Business.</span>
            </h1>

            {/* Sub-headline */}
            <p className="fade-up delay-100 text-[#333] text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              J3 Legacy eliminates the technology headaches that slow down your practice or office. <strong>Purpose-built IT support</strong> for Central Florida small businesses — honest recommendations, no unnecessary upsells.
            </p>

            {/* CTA Buttons */}
            <div className="fade-up delay-200 flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn-cta text-base">
                Book a Free Assessment <ArrowRight size={18} />
              </a>
              <a href="#services" className="btn-navy text-base">
                View Our Services
              </a>
            </div>

            {/* Trust Indicators */}
            <p className="fade-up delay-300 text-[#0B2545]/60 text-sm italic font-medium">
              Trusted by medical practices, law firms, and small businesses across Central Florida.
            </p>
          </div>

          {/* Hero Images Grid */}
          <div className="hidden lg:grid grid-cols-5 gap-3 mt-12 fade-up delay-400">
            {[IMAGES.teamCollab, IMAGES.cybersecurity, IMAGES.itPro, IMAGES.medicalOffice, IMAGES.officeWork].map((src, i) => (
              <div key={i} className={`rounded-lg overflow-hidden shadow-lg ${i === 2 ? "row-span-2" : ""}`} style={{ height: i === 2 ? "280px" : "130px" }}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         PAIN POINTS SECTION
         ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="fade-up text-[#0B2545] text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-6">
              Your Team Is <span className="boxed-keyword">Buried</span> In Tech Distractions.
            </h2>
            <p className="fade-up delay-100 text-[#555] text-lg leading-relaxed mb-8">
              Every day, your staff loses time to problems that have nothing to do with their actual jobs:
            </p>
            <ul className="space-y-4 mb-10">
              {painPoints.map((point, i) => (
                <li key={i} className={`fade-up delay-${(i + 1) * 100 > 500 ? 500 : (i + 1) * 100} flex items-start gap-3 text-[#333] text-base`}>
                  <ChevronRight size={20} className="text-[#C9952A] flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="fade-up text-[#0B2545] font-bold text-base mb-8">
              The average small business loses 11+ hours per employee per month to IT issues. That's lost revenue, missed deadlines, and frustrated staff.
            </p>
            <a href="#contact" className="fade-up btn-cta">
              Take Back Control Now <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
         INDUSTRIES / EXPERTISE SECTION (Dark with Glass Cards)
         ============================================================ */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B2545 0%, #132f55 50%, #0B2545 100%)",
        }}
      >
        {/* Parallax-style background overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url(${IMAGES.networkRoom})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }} />

        <div className="container relative z-10">
          <div className="text-center mb-14">
            <h2 className="fade-up text-white text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-4">
              Built For Central Florida <span className="boxed-keyword-gold">Small Businesses.</span>
              <br />
              Backed By <span className="boxed-keyword-gold">10+ Years</span> Of IT Expertise.
            </h2>
            <p className="fade-up delay-100 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              We specialize in supporting healthcare practices, professional services, and growing businesses across the Orlando metro area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <div
                key={i}
                className={`fade-up delay-${(i + 1) * 100 > 500 ? 500 : (i + 1) * 100} glass-card p-5 text-center`}
              >
                <div className="text-3xl mb-3">{ind.icon}</div>
                <div className="text-white text-sm font-medium leading-snug">{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         3-STEP PROCESS SECTION
         ============================================================ */}
      <section id="process" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="fade-up text-[#0B2545] text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-4">
              A Clear Path From Distracted To <span className="boxed-keyword">Handled.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "Step 1",
                title: "Free IT Health Check",
                desc: "We start with a free 15-minute on-site assessment. You tell us what's frustrating, what's not working, and what's keeping you up at night. No cost, no obligation — just clarity.",
                image: IMAGES.teamCollab,
              },
              {
                step: "Step 2",
                title: "IT & Security Snapshot",
                desc: "We run a complimentary assessment of your current environment. Within 48 hours, you'll see your biggest risks, hidden vulnerabilities, and opportunities to streamline.",
                image: IMAGES.cybersecurity,
              },
              {
                step: "Step 3",
                title: "Ongoing Partnership",
                desc: "If we're the right fit, we take IT off your plate entirely. Cybersecurity, helpdesk, hardware, cloud management. You focus on your business. We handle the rest.",
                image: IMAGES.medicalOffice,
              },
            ].map((item, i) => (
              <div key={i} className={`fade-up delay-${(i + 1) * 100} group`}>
                <div className="relative rounded-xl overflow-hidden mb-5 h-48">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[#C9952A] font-bold text-sm uppercase tracking-wider">{item.step}</span>
                    <h3 className="text-white font-bold text-xl">{item.title}</h3>
                  </div>
                </div>
                <p className="text-[#555] text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-up">
            <a href="#contact" className="btn-cta">
              Schedule a Discovery Call <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
         SERVICES CAROUSEL SECTION
         ============================================================ */}
      <section
        id="services"
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%)" }}
      >
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="fade-up text-[#0B2545] text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-4">
              <span className="boxed-keyword">Technology</span> That Works As Hard As Your Team Does.
            </h2>
            <p className="fade-up delay-100 text-[#C9952A] text-lg font-medium italic">
              From security to support to the systems your team relies on, we keep it all running.
            </p>
          </div>

          <div className="fade-up delay-200">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-14"
            >
              {services.map((svc, i) => (
                <SwiperSlide key={i}>
                  <a href={svc.href} className="block no-underline group">
                    <div className="relative rounded-xl overflow-hidden h-72 bg-[#0B2545]">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <svc.icon size={28} className="text-[#C9952A] mb-3" />
                        <h3 className="text-white font-bold text-xl mb-2">{svc.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{svc.desc}</p>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ============================================================
         VALUE PROPOSITION
         ============================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="fade-up text-[#0B2545] text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-6">
              Our Promise: <span className="boxed-keyword-orange">11+ Hours</span> Back Per Employee, Every Month.
            </h2>
            <p className="fade-up delay-100 text-[#333] font-bold text-lg mb-4">
              We don't just keep your systems running. We give your team their time back.
            </p>
            <p className="fade-up delay-200 text-[#555] text-base leading-relaxed mb-8">
              When IT works the way it should, your people stop losing hours to password resets, software issues, and security fire drills. They get back to the work that actually matters — serving patients, closing deals, and growing your business.
            </p>
            <a href="#contact" className="fade-up delay-300 btn-cta">
              Take Back Control Now <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
         ABOUT / FOUNDER SECTION
         ============================================================ */}
      <section
        id="about"
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B2545 0%, #132f55 50%, #0B2545 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `url(${IMAGES.officeWork})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }} />

        <div className="container relative z-10">
          <div className="text-center mb-6">
            <h2 className="fade-up text-white text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-4">
              Central Florida Roots. <span className="boxed-keyword-gold">10+ Years</span> Of Experience.
              <br />A Different Kind Of IT.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center mt-10">
            <div className="lg:col-span-3">
              <p className="fade-up text-white/80 text-base leading-relaxed mb-6">
                J3 Legacy was built on a simple idea: small businesses deserve an IT partner who actually understands how they work.
              </p>
              <p className="fade-up delay-100 text-white/80 text-base leading-relaxed mb-6">
                We're a <strong className="text-white">Central Florida-based team</strong> led by <strong className="text-white">Jefree Bautista</strong>, a U.S. Army veteran with over a decade of hands-on IT experience. From hardware repair to enterprise systems administration, he's built his career on solving real problems for real people — with integrity, transparency, and zero unnecessary upsells.
              </p>
              <p className="fade-up delay-200 text-white/60 text-sm italic font-semibold uppercase tracking-wide mb-8">
                No tickets into the void. No outsourced call centers. Real conversations with a team that knows your business, shows up when it matters, and becomes part of how you work — built on three values: integrity, transparency, and service.
              </p>
              <a href="#contact" className="fade-up delay-300 btn-cta">
                Meet The Team <ArrowRight size={18} />
              </a>
            </div>
            <div className="lg:col-span-2 fade-up delay-200">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img src={IMAGES.itPro} alt="Jefree Bautista — Founder" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         TESTIMONIALS / REVIEWS SECTION
         ============================================================ */}
      <section id="reviews" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="fade-up text-[#0B2545] text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-4">
              What Our <span className="boxed-keyword">Clients</span> Say.
            </h2>
          </div>

          <div className="fade-up delay-100">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: true }}
              className="pb-14"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="max-w-2xl mx-auto text-center px-4">
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={20} className="text-[#C9952A]" fill="#C9952A" />
                      ))}
                    </div>
                    <p className="text-[#333] text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0B2545] flex items-center justify-center text-white font-bold text-sm">
                        {t.initial}
                      </div>
                      <div className="text-left">
                        <div className="text-[#0B2545] font-bold text-sm">{t.author}</div>
                        <div className="text-[#888] text-xs">{t.location}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Reviews Coming Soon Slide */}
              <SwiperSlide>
                <div className="max-w-2xl mx-auto text-center px-4">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={20} className="text-[#C9952A]/30" />
                    ))}
                  </div>
                  <p className="text-[#555] text-lg leading-relaxed mb-6">More reviews coming soon! We're a growing business and would love your feedback.</p>
                  <a
                    href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta inline-flex"
                  >
                    Leave Us a Google Review <ArrowRight size={18} />
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* ============================================================
         CONTACT SECTION
         ============================================================ */}
      <section
        id="contact"
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B2545 0%, #0d2d52 50%, #0B2545 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url(${IMAGES.contactBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: CTA Text */}
            <div>
              <h2 className="fade-up text-white text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] mb-6">
                Ready To Get Your Team's Time Back?
              </h2>
              <p className="fade-up delay-100 text-white/70 text-lg leading-relaxed mb-8">
                Stop losing hours to IT headaches. Let's talk about what's not working and how we can fix it. Start with a free 15-minute Office IT Health Check — no cost, no obligation.
              </p>
              <div className="fade-up delay-200 flex flex-col gap-4">
                <a href="tel:+14072805106" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors no-underline">
                  <Phone size={20} className="text-[#C9952A]" />
                  <span className="text-lg font-medium">(407) 280-5106</span>
                </a>
                <a href="mailto:info@j3legacy.tech" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors no-underline">
                  <Mail size={20} className="text-[#C9952A]" />
                  <span className="text-lg font-medium">info@j3legacy.tech</span>
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="fade-up delay-200">
              <div className="glass-card-strong p-8 rounded-xl">
                <h3 className="text-white font-bold text-xl mb-6">Contact Our Experts</h3>
                {formSubmitted ? (
                  <div className="text-center py-10">
                    <CheckCircle2 size={48} className="text-[#C9952A] mx-auto mb-4" />
                    <p className="text-white font-bold text-lg mb-2">Message Sent!</p>
                    <p className="text-white/60 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/70 text-sm font-medium mb-1.5 block">First Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C9952A] transition-colors"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-sm font-medium mb-1.5 block">Last Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C9952A] transition-colors"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm font-medium mb-1.5 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C9952A] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm font-medium mb-1.5 block">Phone *</label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C9952A] transition-colors"
                        placeholder="(407) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm font-medium mb-1.5 block">Your Message *</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C9952A] transition-colors resize-none"
                        placeholder="Tell us about your IT challenges..."
                      />
                    </div>
                    <button type="submit" className="btn-cta w-full justify-center text-base">
                      Take Back Control Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
