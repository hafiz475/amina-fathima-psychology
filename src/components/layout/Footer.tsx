import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";

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
            <Link href="/book" className="footer-cta-button">
              Book a Session
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Amina Fathima. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
