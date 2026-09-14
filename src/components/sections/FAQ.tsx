"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">FAQ</span>
          <h2>Common questions</h2>
        </motion.div>

        <div className="faq-list">
          {faqItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`faq-item ${openId === item.id ? "faq-item--open" : ""}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <button
                id={`faq-trigger-${item.id}`}
                className="faq-trigger"
                onClick={() => toggle(item.id)}
                aria-expanded={openId === item.id}
                aria-controls={`faq-content-${item.id}`}
              >
                <span className="faq-question">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`faq-chevron ${openId === item.id ? "faq-chevron--open" : ""}`}
                />
              </button>
              <div
                id={`faq-content-${item.id}`}
                className="faq-content"
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
                hidden={openId !== item.id}
              >
                <p className="faq-answer">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
