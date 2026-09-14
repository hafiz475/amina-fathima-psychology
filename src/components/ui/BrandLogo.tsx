interface BrandLogoProps {
  inverse?: boolean;
  showByline?: boolean;
}

export default function BrandLogo({
  inverse = false,
  showByline = true,
}: BrandLogoProps) {
  return (
    <span className={`brand-logo${inverse ? " brand-logo--inverse" : ""}`}>
      <svg
        className="brand-logo-mark"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Sirat winding path mark"
      >
        <rect width="48" height="48" rx="15" fill="var(--color-sun-light)" />
        <path
          d="M12.5 35.5V23.5C12.5 15.77 17.87 10.5 24 10.5C30.13 10.5 35.5 15.77 35.5 23.5V35.5"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M19 36.5C20.2 30.2 29.1 30.4 29.25 24.55C29.34 21.12 25.45 20.35 25.3 17"
          fill="none"
          stroke="var(--color-sky-strong)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="25.15" cy="15.2" r="2.25" fill="var(--color-apricot)" />
        <path
          d="M16.5 36.5H31.5"
          stroke="var(--color-primary)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      </svg>

      <span className="brand-logo-copy">
        <span className="brand-logo-name">sirat</span>
        {showByline && (
          <span className="brand-logo-byline">
            Amina Fathima · Counselling Psychologist
          </span>
        )}
      </span>
    </span>
  );
}
