/*
 * ServiceDetail — Individual service detail pages
 * Design: "Tactical Glass" — matching main site aesthetic
 * Each service has its own slug, hero, features, and CTA
 */
import { useParams, Link } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, Wifi, Server, Cloud, HardDrive, DatabaseBackup } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect } from "react";

const IMAGES = {
  teamCollab: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/hero-team-collab-2PqPtUdYpzrQTeLHdMA8S5.webp",
  itPro: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/hero-it-professional-EP2H3q4n4C7ZHQZQczPY4X.webp",
  contactBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/contact-bg-n5NJKFcH4XvJSNzPxBRiAg.webp",
  medicalOffice: "https://d2xsxph8kpxj0f.cloudfront.net/310519663561412372/68fCx9jnbJPV59brNuocaz/hero-medical-office-ed3SBBkf6Bwk3BYPjURfp7.webp",
  cybersecurity: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
  networkRoom: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  cloudServer: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  backup: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
  officeWork: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
};

interface ServiceData {
  title: string;
  tagline: string;
  icon: typeof Server;
  heroImage: string;
  description: string;
  features: string[];
  benefits: string[];
  cta: string;
}

const serviceData: Record<string, ServiceData> = {
  "managed-it": {
    title: "Managed IT Support",
    tagline: "Proactive IT management that keeps your business running without interruption.",
    icon: Server,
    heroImage: IMAGES.teamCollab,
    description: "Our Managed IT Support service provides comprehensive, proactive technology management for your business. We monitor your systems 24/7, resolve issues before they become problems, and provide responsive helpdesk support when your team needs it. No more waiting on hold with a faceless call center — you get a dedicated local team that knows your business.",
    features: [
      "24/7 remote monitoring and alerting",
      "Unlimited helpdesk support via phone, email, and on-site",
      "Proactive patch management and updates",
      "Vendor management and coordination",
      "Monthly reporting and technology reviews",
      "Strategic IT planning and budgeting",
      "New employee onboarding and offboarding",
      "Asset tracking and lifecycle management",
    ],
    benefits: [
      "Reduce downtime by up to 85%",
      "Predictable monthly IT costs — no surprise invoices",
      "Free your staff to focus on revenue-generating work",
      "Enterprise-grade support at small business prices",
    ],
    cta: "Get a Free IT Assessment",
  },
  "network-design": {
    title: "Network Design",
    tagline: "Enterprise-grade network architecture built for small business budgets.",
    icon: Wifi,
    heroImage: IMAGES.networkRoom,
    description: "A reliable network is the backbone of every modern business. We design, deploy, and manage enterprise-grade network infrastructure tailored to your specific needs — from UniFi access points and managed switches to VLANs, guest networks, and site-to-site VPNs. Built right the first time, so you never have to think about it again.",
    features: [
      "Full network assessment and design",
      "UniFi and enterprise-grade equipment deployment",
      "VLAN segmentation for security and performance",
      "Secure guest Wi-Fi networks",
      "Site-to-site VPN configuration",
      "Network monitoring and performance optimization",
      "Structured cabling consultation",
      "Bandwidth optimization and QoS",
    ],
    benefits: [
      "Eliminate dead zones and slow connections",
      "Separate guest and business traffic for security",
      "Scale your network as your business grows",
      "Reduce network-related downtime to near zero",
    ],
    cta: "Schedule a Network Assessment",
  },
  "hardware-repair": {
    title: "Hardware Repair",
    tagline: "Expert PC and Mac repair that extends the life of your equipment.",
    icon: HardDrive,
    heroImage: IMAGES.officeWork,
    description: "Don't replace what can be repaired. Our hardware repair service covers everything from SSD upgrades and RAM installs to component-level diagnostics and thermal maintenance. We fix PCs and Macs, extend the life of your equipment, and save your business money — with honest assessments and transparent pricing.",
    features: [
      "PC and Mac diagnostics and repair",
      "SSD and RAM upgrades",
      "Battery replacement",
      "Fan cleaning and thermal paste application",
      "Screen replacement coordination",
      "Data recovery and migration",
      "OS reinstallation and optimization",
      "Peripheral setup and troubleshooting",
    ],
    benefits: [
      "Save 40-60% vs. buying new equipment",
      "Same-day or next-day turnaround on most repairs",
      "Honest diagnosis — we only fix what needs fixing",
      "All repairs backed by our satisfaction guarantee",
    ],
    cta: "Request a Repair Quote",
  },
  "cloud-solutions": {
    title: "Cloud Solutions",
    tagline: "Secure cloud migration and management for the modern workplace.",
    icon: Cloud,
    heroImage: IMAGES.cloudServer,
    description: "Move your business to the cloud with confidence. We handle Microsoft 365 migrations, cloud backup configuration, and hybrid infrastructure design — all with zero downtime and full staff training. Your data stays secure, accessible, and backed up, whether your team works from the office, home, or anywhere in between.",
    features: [
      "Microsoft 365 setup and migration",
      "Cloud backup and disaster recovery",
      "Hybrid cloud infrastructure design",
      "SharePoint and Teams deployment",
      "Email migration and configuration",
      "Cloud security and compliance",
      "Remote work enablement",
      "Cloud cost optimization",
    ],
    benefits: [
      "Access your files from anywhere, securely",
      "Eliminate the cost of on-premise server maintenance",
      "Automatic backups protect against data loss",
      "Scale resources up or down as needed",
    ],
    cta: "Plan Your Cloud Migration",
  },
  cybersecurity: {
    title: "Cybersecurity",
    tagline: "Protect your business from ransomware, phishing, and data breaches.",
    icon: Shield,
    heroImage: IMAGES.cybersecurity,
    description: "Small businesses are the #1 target for cyberattacks — and most don't have the protection they need. We deploy enterprise-grade security tools, train your staff to recognize threats, and create incident response plans that keep your business safe. From endpoint protection to email security, we've got you covered.",
    features: [
      "Endpoint detection and response (EDR)",
      "Email security and anti-phishing",
      "Multi-factor authentication (MFA) deployment",
      "Security awareness training for staff",
      "Dark web monitoring",
      "Vulnerability scanning and patching",
      "Incident response planning",
      "Compliance support (HIPAA, PCI, etc.)",
    ],
    benefits: [
      "Protect patient and client data from breaches",
      "Meet compliance requirements for your industry",
      "Reduce the risk of ransomware by up to 95%",
      "Give your clients confidence in your security posture",
    ],
    cta: "Get a Security Assessment",
  },
  "backup-recovery": {
    title: "Backup & Recovery",
    tagline: "Automated backups and tested disaster recovery — so you're always prepared.",
    icon: DatabaseBackup,
    heroImage: IMAGES.backup,
    description: "Data loss can shut down a business overnight. We implement automated local and cloud backup solutions with regular testing and documented disaster recovery plans. When the worst happens — ransomware, hardware failure, or natural disaster — we get you back online fast, with minimal data loss.",
    features: [
      "Automated local and cloud backups",
      "Regular backup testing and verification",
      "Disaster recovery planning and documentation",
      "Rapid restore capabilities",
      "Ransomware recovery procedures",
      "Business continuity planning",
      "Offsite backup replication",
      "Backup monitoring and alerting",
    ],
    benefits: [
      "Recover from any disaster in hours, not days",
      "Protect against ransomware with immutable backups",
      "Meet insurance and compliance backup requirements",
      "Sleep better knowing your data is always safe",
    ],
    cta: "Protect Your Data Now",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-[#0B2545] text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-[#555] mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/" className="btn-cta">Back to Home <ArrowRight size={18} /></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0B2545 0%, #132f55 50%, #0B2545 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url(${service.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div className="container relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 no-underline transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[#C9952A] flex items-center justify-center">
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <h1 className="fade-up text-white text-3xl sm:text-4xl lg:text-5xl font-bold">{service.title}</h1>
            </div>
          </div>
          <p className="fade-up delay-100 text-white/70 text-xl max-w-2xl leading-relaxed">{service.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="fade-up text-[#333] text-lg leading-relaxed mb-8">{service.description}</p>
              <a href="/#contact" className="fade-up delay-100 btn-cta">
                {service.cta} <ArrowRight size={18} />
              </a>
            </div>
            <div className="fade-up delay-200 rounded-xl overflow-hidden shadow-lg h-72 lg:h-auto">
              <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24" style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%)" }}>
        <div className="container">
          <h2 className="fade-up text-[#0B2545] text-2xl sm:text-3xl font-bold mb-10">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <div key={i} className={`fade-up delay-${(i % 5 + 1) * 100} flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm`}>
                <CheckCircle2 size={20} className="text-[#C9952A] flex-shrink-0 mt-0.5" />
                <span className="text-[#333] text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <h2 className="fade-up text-[#0B2545] text-2xl sm:text-3xl font-bold mb-10">Why It Matters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.benefits.map((benefit, i) => (
              <div key={i} className={`fade-up delay-${(i + 1) * 100} bg-[#0B2545] rounded-xl p-6`}>
                <p className="text-white text-lg font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg, #0B2545 0%, #132f55 100%)" }}>
        <div className="container text-center">
          <h2 className="fade-up text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to get started with {service.title}?
          </h2>
          <p className="fade-up delay-100 text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Book a free 15-minute IT Health Check and let's discuss how we can help your business.
          </p>
          <a href="/#contact" className="fade-up delay-200 btn-cta text-lg">
            {service.cta} <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
