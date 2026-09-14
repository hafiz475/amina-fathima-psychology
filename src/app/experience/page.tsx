import type { Metadata } from "next";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Clinical Experience",
  description:
    "Clinical training and experience across psychiatric, hospital, neurological, rehabilitation and educational settings.",
};

export default function ExperiencePage() {
  return (
    <div className="section">
      <div className="container">
        <span className="label">Clinical Experience</span>
        <h1 style={{ marginTop: "0.5rem", marginBottom: "3rem" }}>
          Where I have trained
        </h1>

        <div className="timeline">
          {experience.map((entry, i) => (
            <div key={entry.id} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {i < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">{entry.title}</h3>
                <p className="timeline-subtitle">{entry.description}</p>
                <p className="timeline-details">{entry.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
