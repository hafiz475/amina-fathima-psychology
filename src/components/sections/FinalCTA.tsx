"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircleHeart } from "lucide-react";
import BookingIcon from "@/components/ui/BookingIcon";

export default function FinalCTA() {
  return (
    <section className="final-cta-section" id="book-cta">
      <div className="container">
        <motion.div
          className="final-cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="final-cta-icon" aria-hidden="true">
            <MessageCircleHeart size={27} strokeWidth={1.6} />
          </span>
          <h2 className="final-cta-heading">
            You don&apos;t have to navigate
            <br />
            everything alone.
          </h2>
          <p className="final-cta-subtext">Begin with a conversation.</p>
          <Link href="/book" className="final-cta-button booking-pulse-cta">
            <BookingIcon />
            Book a Confidential Session
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
