"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, MessageCircleHeart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid grid items-center">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-shape about-shape--sky" aria-hidden="true" />
            <span className="about-shape about-shape--sun" aria-hidden="true" />
            <div className="about-visual-card">
              <span className="about-visual-icon" aria-hidden="true">
                <MessageCircleHeart size={27} strokeWidth={1.6} />
              </span>
              <p>
                “A safe, non-judgmental space to explore what you&apos;re
                experiencing—at your own pace.”
              </p>
              <div className="about-visual-values" aria-label="Practice values">
                <span>
                  <Heart size={15} aria-hidden="true" /> Empathy
                </span>
                <span>
                  <Sparkles size={15} aria-hidden="true" /> Insight
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-content flex flex-col items-start"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="label label--sun">About Syed Amina</span>
            <h2>
              Counselling psychology grounded in empathy, confidentiality and
              evidence-informed care.
            </h2>
            <p className="lead">
              I provide a safe, non-judgmental space for individuals and couples
              to explore their concerns, develop insight and work towards
              meaningful change. My approach is client-centered, drawing on
              evidence-informed practices to support emotional wellbeing,
              relationships and personal growth.
            </p>

            <div className="about-credentials" aria-label="Qualifications">
              <div className="about-credential">
                <span className="about-credential-degree">
                  M.Sc. Counselling Psychology
                </span>
                <span className="about-credential-institution">
                  University of Madras
                </span>
              </div>
              <div className="about-credential">
                <span className="about-credential-degree">B.Sc. Psychology</span>
                <span className="about-credential-institution">MSSW College</span>
              </div>
            </div>

            <Link href="/about" className="about-read-more">
              More about Syed Amina
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
