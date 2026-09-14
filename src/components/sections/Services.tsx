"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  HandHeart,
  HeartHandshake,
  LifeBuoy,
  Presentation,
  UserRound,
} from "lucide-react";
import { services } from "@/data/services";

const serviceVisuals: Record<string, { icon: LucideIcon; tone: string }> = {
  "individual-counselling": { icon: UserRound, tone: "sky" },
  "relationship-counselling": { icon: HeartHandshake, tone: "apricot" },
  "workplace-mental-health": { icon: Building2, tone: "sun" },
  "eap-counselling": { icon: HandHeart, tone: "sage" },
  "crisis-intervention": { icon: LifeBuoy, tone: "sky" },
  workshops: { icon: Presentation, tone: "apricot" },
};

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <motion.div
          className="section-header section-header--split grid items-end"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="label">Ways to work together</span>
            <h2>Support for people, relationships and workplaces.</h2>
          </div>
          <p className="lead">
            Choose the kind of support that best fits where you are right now.
          </p>
        </motion.div>

        <div className="services-grid grid">
          {services.map((service, index) => {
            const visual = serviceVisuals[service.id] ?? {
              icon: HandHeart,
              tone: "sage",
            };
            const Icon = visual.icon;

            return (
              <motion.article
                key={service.id}
                id={service.id}
                className={`service-card service-card--${visual.tone} flex flex-col`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
              >
                <div className="service-card-topline">
                  <span className="service-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.7} />
                  </span>
                  <span className="service-number">{service.number}</span>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-areas" aria-label={`${service.title} includes`}>
                    {service.areas.map((area) => (
                      <li key={area} className="service-area-tag">
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <Link href="/services" className="services-more-link">
          View all service details
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
