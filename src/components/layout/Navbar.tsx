"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Compass,
  HeartHandshake,
  UserRound,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import MenuGlyph from "./MenuGlyph";
import BrandLogo from "@/components/ui/BrandLogo";
import BookingIcon from "@/components/ui/BookingIcon";

const navLinks = [
  {
    label: "Areas I work with",
    href: "/#support-areas",
    icon: Brain,
    tone: "sky" as const,
  },
  {
    label: "Services",
    href: "/#services",
    icon: HeartHandshake,
    tone: "apricot" as const,
  },
  {
    label: "Approach",
    href: "/#approach",
    icon: Compass,
    tone: "sun" as const,
  },
  {
    label: "About",
    href: "/#about",
    icon: UserRound,
    tone: "sage" as const,
  },
  {
    label: "Resources",
    href: "/resources",
    icon: BookOpen,
    tone: "sky" as const,
  },
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
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1100px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

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
          <Link href="/book" className="navbar-cta booking-pulse-cta">
            <BookingIcon />
            Book a Session
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`navbar-toggle ${mobileOpen ? "navbar-toggle--open" : ""}`}
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <MenuGlyph open={mobileOpen} />
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
