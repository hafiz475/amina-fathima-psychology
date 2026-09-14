"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  HandHeart,
  HeartHandshake,
  LifeBuoy,
  Presentation,
  UserRound,
} from "lucide-react";
import { services } from "@/data/services";

interface ServiceVisual {
  icon: LucideIcon;
  tone: "sky" | "apricot" | "sun" | "sage";
  image: string;
  alt: string;
}

const serviceVisuals: Record<string, ServiceVisual> = {
  "individual-counselling": {
    icon: UserRound,
    tone: "sky",
    image: "/images/illustrations/services/individual-counselling.webp",
    alt: "A counsellor and one client in a calm, private conversation",
  },
  "relationship-counselling": {
    icon: HeartHandshake,
    tone: "apricot",
    image: "/images/illustrations/services/relationship-counselling.webp",
    alt: "A counsellor helping a couple listen and communicate",
  },
  "workplace-mental-health": {
    icon: Building2,
    tone: "sun",
    image: "/images/illustrations/services/workplace-mental-health.webp",
    alt: "An employee receiving confidential mental health support at work",
  },
  "eap-counselling": {
    icon: HandHeart,
    tone: "sage",
    image: "/images/illustrations/services/eap-counselling.webp",
    alt: "An employee being connected with reassuring professional support",
  },
  "crisis-intervention": {
    icon: LifeBuoy,
    tone: "sky",
    image: "/images/illustrations/services/crisis-intervention.webp",
    alt: "A mental health professional calmly supporting a distressed adult",
  },
  workshops: {
    icon: Presentation,
    tone: "apricot",
    image: "/images/illustrations/services/psychoeducation-workshops.webp",
    alt: "A counsellor leading an inclusive mental health workshop",
  },
};

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollFrame = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const centerSlide = useCallback(
    (
      index: number,
      behavior: ScrollBehavior = shouldReduceMotion ? "auto" : "smooth",
    ) => {
      const track = trackRef.current;
      const slide = slideRefs.current[index];

      if (!track || !slide) return;

      const left =
        slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
      track.scrollTo({ left, behavior });
    },
    [shouldReduceMotion],
  );

  const selectSlide = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, services.length - 1));
    setActiveIndex(boundedIndex);
    centerSlide(boundedIndex);
  };

  const handleTrackScroll = () => {
    if (scrollFrame.current !== null) {
      window.cancelAnimationFrame(scrollFrame.current);
    }

    scrollFrame.current = window.requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;

      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(trackCenter - slideCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      scrollFrame.current = null;
    });
  };

  const handleTrackKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectSlide(services.length - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => centerSlide(activeIndex, "auto");
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, [activeIndex, centerSlide]);

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <motion.div
          className="section-header section-header--split services-heading"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
        >
          <div>
            <span className="label label--apricot">Ways to work together</span>
            <h2>See what each kind of support looks like.</h2>
          </div>
          <p className="lead">
            Move through the scenes to understand the focus of each service and
            what it can include.
          </p>
        </motion.div>

        <motion.div
          className="services-coverflow"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Counselling services"
        >
          <div className="services-coverflow-toolbar">
            <p>
              <span className="services-coverflow-current">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true"> / </span>
              <span className="sr-only">of</span>
              {String(services.length).padStart(2, "0")}
              <span className="services-coverflow-hint">Swipe or use the arrows</span>
            </p>
            <div className="services-coverflow-arrows">
              <button
                type="button"
                onClick={() => selectSlide(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous service"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex + 1)}
                disabled={activeIndex === services.length - 1}
                aria-label="Next service"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Showing {services[activeIndex].title}, service {activeIndex + 1} of{" "}
            {services.length}
          </p>

          <div
            ref={trackRef}
            className="services-coverflow-track"
            tabIndex={0}
            onScroll={handleTrackScroll}
            onKeyDown={handleTrackKeyDown}
            aria-label="Service slides. Use left and right arrow keys to move."
          >
            {services.map((service, index) => {
              const visual = serviceVisuals[service.id];
              const Icon = visual.icon;
              const distance = index - activeIndex;
              const position =
                distance === 0
                  ? "active"
                  : distance === -1
                    ? "before"
                    : distance === 1
                      ? "after"
                      : distance < 0
                        ? "far-before"
                        : "far-after";

              return (
                <article
                  key={service.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  id={service.id}
                  className={`service-slide service-slide--${visual.tone}`}
                  data-position={position}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${services.length}: ${service.title}`}
                  onClick={() => {
                    if (index !== activeIndex) selectSlide(index);
                  }}
                >
                  <div className="service-slide-visual">
                    <Image
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 639px) 86vw, (max-width: 1099px) 40vw, 390px"
                    />
                    <span className="service-slide-number">{service.number}</span>
                    <span className="service-slide-icon" aria-hidden="true">
                      <Icon size={23} strokeWidth={1.7} />
                    </span>
                  </div>

                  <div className="service-slide-copy">
                    <p className="service-slide-kicker">Service {service.number}</p>
                    <h3>{service.title}</h3>
                    <p className="service-slide-description">
                      {service.description}
                    </p>
                    <div className="service-slide-includes">
                      <p>Support can include</p>
                      <ul>
                        {service.areas.map((area) => (
                          <li key={area}>
                            <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="services-coverflow-dots" aria-label="Choose a service">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => selectSlide(index)}
                aria-label={`Show ${service.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>
        </motion.div>

        <Link href="/services" className="services-more-link">
          View all service details
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
