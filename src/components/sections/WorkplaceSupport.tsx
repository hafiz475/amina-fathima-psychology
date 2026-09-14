"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default function WorkplaceSupport() {
  return (
    <section className="workplace-section" id="workplace">
      <span className="workplace-orb workplace-orb--sky" aria-hidden="true" />
      <span className="workplace-orb workplace-orb--sun" aria-hidden="true" />
      <div className="container">
        <div className="workplace-content">
          <motion.div
            className="workplace-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="workplace-icon">
              <Building2 size={28} strokeWidth={1.5} />
            </div>
            <span className="label">Workplace Mental Health</span>
            <h2>Support for employees and their families.</h2>
            <p className="lead">
              Confidential EAP-based counselling for stress, burnout,
              interpersonal issues and mental health concerns. Supporting
              individuals and organizations with practical, evidence-informed
              mental health support.
            </p>
            <Link href="/services#workplace-mental-health" className="workplace-cta">
              Workplace Support <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
