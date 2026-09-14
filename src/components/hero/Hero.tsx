"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Languages,
  MessageCircleHeart,
  ShieldCheck,
} from "lucide-react";
import HeroBackground from "./HeroBackground";
import "./hero.scss";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero" id="hero">
      <HeroBackground />

      <div className="hero-content grid items-center">
        <div className="hero-text flex flex-col items-start">
          <motion.div
            className="hero-label"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <MessageCircleHeart size={16} aria-hidden="true" />
            Counselling with Amina Fathima
          </motion.div>

          <motion.h1
            className="hero-heading"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            A safe space for every part of your story.
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Confidential, client-centered counselling for emotional wellbeing,
            relationships, life transitions, workplace stress and a wide range
            of psychological concerns.
          </motion.p>

          <motion.div
            className="hero-actions flex flex-wrap items-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link href="/book" className="hero-cta">
              Begin with a conversation
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href="#approach" className="hero-link">
              Explore my approach
            </a>
          </motion.div>

          <motion.ul
            className="hero-trust-list flex flex-wrap"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            aria-label="Session information"
          >
            <li>
              <ShieldCheck size={17} aria-hidden="true" />
              Confidential space
            </li>
            <li>
              <Languages size={17} aria-hidden="true" />
              English · Hindi · Urdu
            </li>
          </motion.ul>
        </div>

        <motion.figure
          className="hero-visual"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.25, duration: shouldReduceMotion ? 0 : 0.75, ease: "easeOut" }}
        >
          <div className="hero-illustration-frame">
            <Image
              src="/images/illustrations/sirat-hero.webp"
              alt="A counsellor and client having a calm conversation in a welcoming room"
              fill
              preload
              sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 560px"
            />
          </div>
          <motion.figcaption
            className="hero-floating-note hero-floating-note--top"
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="hero-note-dot hero-note-dot--sun" />
            At your pace
          </motion.figcaption>
          <motion.div
            className="hero-floating-note hero-floating-note--bottom"
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="hero-note-dot hero-note-dot--sky" />
            Understand · process · move forward
          </motion.div>
        </motion.figure>
      </div>
    </section>
  );
}
