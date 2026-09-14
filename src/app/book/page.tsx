import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a confidential counselling session with Amina Fathima — Counselling Psychologist.",
};

export default function BookPage() {
  return (
    <div className="section">
      <div className="container">
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span className="label">Book a Session</span>
          <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
            Begin with a conversation
          </h1>
          <p className="lead" style={{ marginBottom: "2.5rem" }}>
            Take the first step towards understanding and change. Book a
            confidential counselling session at a time that suits you.
          </p>

          <div
            style={{
              padding: "3rem 2rem",
              backgroundColor: "var(--color-mint)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Booking functionality will be integrated here. You can connect your
              preferred scheduling tool (Calendly, Cal.com, or a custom form) to
              enable direct appointment booking.
            </p>
            <Link
              href="/contact"
              className="hero-cta"
              style={{ display: "inline-flex" }}
            >
              Contact to Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
