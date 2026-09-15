import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Camera, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import BookingIcon from "@/components/ui/BookingIcon";
import { getWhatsAppProfileUrl } from "@/data/contact";

const footerLinks = {
  quickLinks: [
    { label: "About", href: "/#about" },
    { label: "Areas I Work With", href: "/#support-areas" },
    { label: "Services", href: "/#services" },
    { label: "Approach", href: "/#approach" },
    { label: "Clinical Experience", href: "/#experience" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Individual Counselling", href: "/services#individual-counselling" },
    { label: "Relationship Counselling", href: "/services#relationship-counselling" },
    { label: "Workplace Mental Health", href: "/services#workplace-mental-health" },
    { label: "EAP Counselling", href: "/services#eap-counselling" },
  ],
};

interface SocialLink {
  label: string;
  href: string | null;
  icon: LucideIcon;
  tone: "whatsapp" | "linkedin" | "instagram";
}

const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    href: getWhatsAppProfileUrl(),
    icon: MessageCircle,
    tone: "whatsapp",
  },
  {
    label: "LinkedIn",
    href: null,
    icon: BriefcaseBusiness,
    tone: "linkedin",
  },
  {
    label: "Instagram",
    href: null,
    icon: Camera,
    tone: "instagram",
  },
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Sirat home">
              <BrandLogo inverse />
            </Link>
            <p className="footer-description">
              Confidential, client-centered counselling for emotional wellbeing,
              relationships and workplace mental health.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <nav aria-label="Footer quick links">
              {footerLinks.quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-column-title">Services</h4>
            <nav aria-label="Footer services">
              {footerLinks.services.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA Column */}
          <div className="footer-column">
            <h4 className="footer-column-title">Get Started</h4>
            <p className="footer-cta-text">
              Ready to begin? Book a confidential session.
            </p>
            <Link href="/book" className="footer-cta-button booking-pulse-cta">
              <BookingIcon />
              Book a Session
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Syed Amina. All rights reserved.
          </p>
          <div
            className="footer-socials"
            id="footer-socials"
            aria-label="Social media"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const content = (
                <>
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span>{social.label}</span>
                </>
              );

              return social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  className={`footer-social footer-social--${social.tone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <span
                  key={social.label}
                  className={`footer-social footer-social--${social.tone} footer-social--placeholder`}
                  role="link"
                  aria-disabled="true"
                  aria-label={`${social.label} link coming soon`}
                  title="Link coming soon"
                >
                  {content}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
