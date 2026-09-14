"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Compass,
  Goal,
  HandHeart,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { therapeuticApproaches } from "@/data/supportAreas";

const principles: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
}> = [
  {
    title: "Client-Centered",
    description:
      "Your experiences, needs and goals remain central to the counselling process.",
    icon: UsersRound,
    tone: "sage",
  },
  {
    title: "Evidence-Informed",
    description:
      "Using appropriate psychological approaches and techniques to support meaningful change.",
    icon: Compass,
    tone: "sky",
  },
  {
    title: "Confidential",
    description:
      "A respectful and private environment for open conversations.",
    icon: ShieldCheck,
    tone: "sun",
  },
  {
    title: "Goal-Oriented",
    description:
      "Focused on developing practical strategies, insight and emotional resilience.",
    icon: Goal,
    tone: "apricot",
  },
];

export default function Approach() {
  return (
    <section className="section approach-section" id="approach">
      <div className="container">
        <div className="approach-story-grid grid items-center">
          <motion.div
            className="approach-story-copy flex flex-col items-start"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55 }}
          >
            <span className="label label--apricot">
              <HandHeart size={15} aria-hidden="true" />
              My approach
            </span>
            <h2>A thoughtful path, shaped around you.</h2>
            <p className="lead">
              Counselling is collaborative. We work at a pace that respects your
              experiences, needs and goals, with space for both reflection and
              practical skill building.
            </p>

            <div className="approach-principles grid">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article
                    className={`approach-principle approach-principle--${principle.tone}`}
                    key={principle.title}
                  >
                    <span className="approach-principle-icon" aria-hidden="true">
                      <Icon size={19} />
                    </span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>

          <motion.figure
            className="approach-illustration"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <Image
              src="/images/illustrations/approach-steady-progress.webp"
              alt="A person following stepping stones along a gentle path toward sunrise"
              width={1280}
              height={800}
              sizes="(max-width: 899px) 92vw, 46vw"
            />
            <figcaption>Small steps can still create meaningful movement.</figcaption>
          </motion.figure>
        </div>

        <motion.div
          className="therapeutic-approaches grid"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="therapeutic-approaches-heading">
            <span className="therapeutic-approaches-icon" aria-hidden="true">
              <Sparkles size={23} />
            </span>
            <div>
              <span className="label">Therapeutic approaches</span>
              <h3>Tools that can support the work</h3>
            </div>
          </div>

          <ul className="therapeutic-approaches-list">
            {therapeuticApproaches.map((approach) => (
              <li key={approach}>
                <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                <span>{approach}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
