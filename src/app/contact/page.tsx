"use client";

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: "560px" }}>
          <span className="label">Contact</span>
          <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
            Get in touch
          </h1>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            If you would like to book a session or have any questions, please
            reach out using the form below.
          </p>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  marginBottom: "0.375rem",
                  color: "var(--color-text)",
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text)",
                  background: "var(--color-white)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                style={{
                  display: "block",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  marginBottom: "0.375rem",
                  color: "var(--color-text)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text)",
                  background: "var(--color-white)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: "block",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  marginBottom: "0.375rem",
                  color: "var(--color-text)",
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text)",
                  background: "var(--color-white)",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <button
              type="submit"
              className="hero-cta"
              style={{ alignSelf: "flex-start" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
