import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Mental health resources, articles and guides from Syed Amina — Counselling Psychologist.",
};

export default function ResourcesPage() {
  return (
    <div className="section">
      <div className="container">
        <span className="label">Resources</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          Resources
        </h1>
        <p className="lead" style={{ maxWidth: "560px" }}>
          Helpful resources, articles and guides on mental health and wellbeing
          will be shared here. Check back soon.
        </p>
      </div>
    </div>
  );
}
