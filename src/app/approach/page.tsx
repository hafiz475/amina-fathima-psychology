import type { Metadata } from "next";
import { Check } from "lucide-react";
import { therapeuticApproaches } from "@/data/supportAreas";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "My counselling approach — client-centered, evidence-informed, confidential and goal-oriented therapy for meaningful change.",
};

const principles = [
  {
    number: "01",
    title: "Client-Centered",
    description:
      "Your experiences, needs and goals remain central to the counselling process. I work collaboratively with you, respecting your pace and perspective.",
  },
  {
    number: "02",
    title: "Evidence-Informed",
    description:
      "I draw on appropriate psychological approaches and evidence-based techniques to support meaningful and lasting change.",
  },
  {
    number: "03",
    title: "Confidential",
    description:
      "A respectful and private environment for open conversations. Everything shared in session remains confidential within ethical boundaries.",
  },
  {
    number: "04",
    title: "Goal-Oriented",
    description:
      "Together, we focus on developing practical strategies, building insight and strengthening emotional resilience.",
  },
];

export default function ApproachPage() {
  return (
    <div className="section">
      <div className="container">
        <span className="label">My Approach</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          How I work
        </h1>
        <p
          className="lead"
          style={{ marginBottom: "3rem", maxWidth: "560px" }}
        >
          My counselling practice is guided by four core principles that shape
          every session.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {principles.map((p) => (
            <div
              key={p.number}
              style={{
                padding: "2rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: "var(--color-sage)",
                  lineHeight: 1,
                }}
              >
                {p.number}
              </span>
              <h3 style={{ marginTop: "0.75rem", marginBottom: "0.5rem" }}>
                {p.title}
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <section className="therapeutic-approaches" style={{ marginTop: "4rem" }}>
          <div className="therapeutic-approaches-heading">
            <div>
              <span className="label">Therapeutic Approaches</span>
              <h2 style={{ marginTop: "0.5rem", fontSize: "1.5rem" }}>
                Tools that can support the work
              </h2>
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
        </section>
      </div>
    </div>
  );
}
