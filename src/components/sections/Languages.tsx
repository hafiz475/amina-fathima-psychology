"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const languages = ["English", "Hindi", "Urdu"];

export default function Languages() {
  return (
    <section className="section languages-section" id="languages">
      <div className="container">
        <motion.div
          className="languages-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="languages-icon">
            <Globe size={24} strokeWidth={1.5} />
          </div>
          <span className="label">Sessions Available In</span>
          <div className="languages-list">
            {languages.map((lang, i) => (
              <span key={lang} className="language-item">
                {lang}
                {i < languages.length - 1 && (
                  <span className="language-separator" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
