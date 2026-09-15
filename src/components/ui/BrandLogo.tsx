import Image from "next/image";

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
      <Image
        className="brand-logo-mark"
        src="/images/brand/sirat-tree-logo.png"
        alt="Sirat tree and butterfly mark"
        width={64}
        height={64}
      />

      <span className="brand-logo-copy">
        <span className="brand-logo-name">sirat</span>
        {showByline && (
          <span className="brand-logo-byline">
            Syed Amina · Counselling Psychologist
          </span>
        )}
      </span>
    </span>
  );
}
