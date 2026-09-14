import type { Metadata } from "next";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Counselling services including individual counselling, relationship counselling, workplace mental health, EAP, crisis intervention and psychoeducation workshops.",
};

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container">
        <span className="label">Services</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          How I can help
        </h1>
        <p
          className="lead"
          style={{ marginBottom: "3rem", maxWidth: "560px" }}
        >
          I offer a range of counselling services designed to support
          individuals, couples and organizations through life&apos;s challenges.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              style={{
                padding: "2rem 0",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "baseline",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: "var(--color-teal)",
                    fontSize: "1.125rem",
                  }}
                >
                  {service.number}
                </span>
                <h2 style={{ fontSize: "1.5rem" }}>{service.title}</h2>
              </div>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  marginBottom: "1rem",
                }}
              >
                {service.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {service.areas.map((area) => (
                  <span key={area} className="service-area-tag">
                    {area}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
