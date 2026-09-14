"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import BrandLogo from "@/components/ui/BrandLogo";

const navLinks = [
  { label: "Areas I work with", href: "/#support-areas" },
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        role="banner"
      >
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo" aria-label="Sirat home">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="navbar-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link href="/book" className="navbar-cta">
            Book a Session
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
        links={navLinks}
      />
    </>
  );
}
