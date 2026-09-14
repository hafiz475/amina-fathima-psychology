"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export default function ClinicalExperience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Clinical Experience</span>
          <h2>Where I have trained</h2>
        </motion.div>

        <div className="timeline">
          {experience.map((entry, i) => (
            <motion.div
              key={entry.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {i < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">{entry.title}</h3>
                <p className="timeline-subtitle">{entry.description}</p>
                <p className="timeline-details">{entry.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
