"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, MessageCircleHeart } from "lucide-react";
import { credentials } from "@/data/credentials";

const credentialVisuals = [
  { icon: MessageCircleHeart, tone: "sky" },
  { icon: GraduationCap, tone: "sun" },
  { icon: Building2, tone: "apricot" },
];

export default function Credentials() {
  return (
    <section
      className="credentials"
      id="credentials"
      aria-label="Professional overview"
    >
      <div className="container">
        <motion.div
          className="credentials-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {credentials.map((item, i) => {
            const Icon = credentialVisuals[i].icon;

            return (
              <motion.div
                key={item.label}
                className="credential-item"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span
                  className={`credential-icon credential-icon--${credentialVisuals[i].tone}`}
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <span className="credential-copy">
                  <span className="credential-value">{item.value}</span>
                  <span className="credential-label">{item.label}</span>
                  <span className="credential-sublabel">{item.sublabel}</span>
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
