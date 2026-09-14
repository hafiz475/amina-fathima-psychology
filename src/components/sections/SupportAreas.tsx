"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Check,
  GraduationCap,
  Heart,
  HeartHandshake,
  LifeBuoy,
  Repeat2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { supportCategories } from "@/data/supportAreas";

const categoryIcons: Record<string, LucideIcon> = {
  clinical: Brain,
  emotional: Heart,
  behavioural: Repeat2,
  relationships: HeartHandshake,
  trauma: ShieldCheck,
  "academic-career": GraduationCap,
};

export default function SupportAreas() {
  return (
    <section className="section support-section" id="support-areas">
      <div className="container">
        <div className="support-intro-grid grid items-center">
          <motion.div
            className="support-intro-copy flex flex-col items-start"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55 }}
          >
            <span className="label label--sky">
              <Sparkles size={15} aria-hidden="true" />
              Areas I work with
            </span>
            <h2>Whatever feels heavy, we can begin by understanding it.</h2>
            <p className="lead">
              I work with all kinds of mental health, emotional, behavioral and
              clinical psychological concerns.
            </p>
            <p>
              This includes (but is not limited to) concerns like depression,
              anxiety, panic attacks, stress, trauma, mood disorders and many
              other psychological difficulties.
            </p>
          </motion.div>

          <motion.figure
            className="support-illustration"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <Image
              src="/images/illustrations/areas-of-support.webp"
              alt="An illustrated collage of emotional wellbeing, relationships, study, rest and personal growth"
              width={1280}
              height={800}
              sizes="(max-width: 767px) 92vw, 48vw"
            />
          </motion.figure>
        </div>

        <div className="support-category-grid grid items-start">
          {supportCategories.map((category, index) => {
            const Icon = categoryIcons[category.id] ?? Sparkles;

            return (
              <motion.article
                key={category.id}
                className={`support-category support-category--${category.tone}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
              >
                <div className="support-category-heading">
                  <span className="support-category-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <div>
                    <span className="support-category-count">
                      {category.concerns.length} areas
                    </span>
                    <h3>{category.title}</h3>
                  </div>
                </div>

                <ul className="support-concern-list">
                  {category.concerns.map((concern) => (
                    <li key={concern}>
                      <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>

                {category.id === "clinical" && (
                  <p className="support-more">And more</p>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="support-safety-note" role="note">
          <span className="support-safety-icon" aria-hidden="true">
            <LifeBuoy size={21} />
          </span>
          <p>
            <strong>Need urgent help?</strong> This website and booking service
            are not emergency services. If you or someone else is in immediate
            danger, contact local emergency services or go to the nearest
            emergency department.
          </p>
        </div>
      </div>
    </section>
  );
}
