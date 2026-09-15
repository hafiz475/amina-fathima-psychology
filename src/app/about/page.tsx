import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Syed Amina — Counselling Psychologist with M.Sc. in Counselling Psychology, providing client-centered mental health support.",
};

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <span className="label">About</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
          About Syed Amina
        </h1>
        <div style={{ maxWidth: "680px" }}>
          <p className="lead" style={{ marginBottom: "1.5rem" }}>
            I am a counselling psychologist with a Master&apos;s degree in
            Counselling Psychology from the University of Madras. My practice is
            grounded in empathy, confidentiality and evidence-informed care.
          </p>
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.75 }}>
            I provide a safe, non-judgmental space for individuals and couples to
            explore their concerns, develop insight and work towards meaningful
            change. With experience across clinical, corporate and community
            settings, I bring a holistic understanding of the challenges people
            face in their personal and professional lives.
          </p>
          <h3 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>
            Qualifications
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <li>
              <strong>M.Sc. Counselling Psychology</strong>
              <br />
              <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                University of Madras
              </span>
            </li>
            <li>
              <strong>B.Sc. Psychology</strong>
              <br />
              <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                MSSW College
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
