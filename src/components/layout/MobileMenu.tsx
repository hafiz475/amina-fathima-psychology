"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import MenuGlyph from "./MenuGlyph";

const MotionLink = motion.create(Link);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: {
    label: string;
    href: string;
    icon: LucideIcon;
    tone: "sky" | "apricot" | "sun" | "sage";
  }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(true);

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = true;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreFocusRef.current) previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  const closeFromNavigation = () => {
    restoreFocusRef.current = false;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
            id="mobile-navigation"
          >
            <span className="mobile-menu-orbit mobile-menu-orbit--one" aria-hidden="true" />
            <span className="mobile-menu-orbit mobile-menu-orbit--two" aria-hidden="true" />

            {/* Header */}
            <div className="mobile-menu-header">
              <BrandLogo />
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="mobile-menu-close"
                aria-label="Close menu"
              >
                <MenuGlyph open />
              </button>
            </div>

            {/* Links */}
            <p className="mobile-menu-eyebrow">Choose where to go</p>
            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              {links.map((link, i) => {
                const Icon = link.icon;

                return (
                  <MotionLink
                    key={link.href}
                    href={link.href}
                    className={`mobile-menu-link mobile-menu-link--${link.tone}`}
                    onClick={closeFromNavigation}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.28 }}
                  >
                    <span className="mobile-menu-link-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="mobile-menu-link-label">{link.label}</span>
                    <span className="mobile-menu-link-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </MotionLink>
                );
              })}
            </nav>

            {/* CTA */}
            <motion.div
              className="mobile-menu-cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <p className="mobile-menu-assurance">
                <ShieldCheck size={16} aria-hidden="true" />
                Confidential support, at your pace.
              </p>
              <Link href="/book" className="hero-cta" onClick={closeFromNavigation}>
                Book a Session
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
