import Image from "next/image";

export default function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <span className="hero-orb hero-orb--sun" />
      <span className="hero-orb hero-orb--sky" />
      <span className="hero-orb hero-orb--apricot" />
      <Image
        src="/illustrations/psychology-hero.svg"
        alt=""
        fill
        sizes="100vw"
        className="hero-background-pattern"
      />
    </div>
  );
}
