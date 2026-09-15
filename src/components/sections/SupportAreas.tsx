"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Heart,
  HeartHandshake,
  LifeBuoy,
  Plus,
  Repeat2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { supportCategories } from "@/data/supportAreas";

const categoryIcons: Record<string, LucideIcon> = {
  clinical: Brain,
  emotional: Heart,
  behavioural: Repeat2,
  relationships: HeartHandshake,
  trauma: ShieldCheck,
  "academic-career": GraduationCap,
};

const categoryIllustrationAlt: Record<string, string> = {
  clinical: "A tangled line opening toward sunlight",
  emotional: "A woman pausing calmly with a hand over her heart",
  behavioural: "Hands nurturing a growing plant",
  relationships: "Two people speaking and listening to each other",
  trauma: "A family holding one another in a protective embrace",
  "academic-career": "A woman reading and learning",
};

export default function SupportAreas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollTimer = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const centerTab = useCallback(
    (
      index: number,
      behavior: ScrollBehavior = shouldReduceMotion ? "auto" : "smooth",
    ) => {
      const tabs = tabsRef.current;
      const tab = tabRefs.current[index];

      if (!tabs || !tab || tabs.scrollWidth <= tabs.clientWidth) return;

      const left = tab.offsetLeft - (tabs.clientWidth - tab.clientWidth) / 2;
      tabs.scrollTo({ left, behavior });
    },
    [shouldReduceMotion],
  );

  const selectCategory = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    centerTab(index);

    if (moveFocus) {
      const tab = tabRefs.current[index];
      tab?.focus();
    }
  };

  const handleTabsScroll = () => {
    if (scrollTimer.current !== null) {
      window.clearTimeout(scrollTimer.current);
    }

    scrollTimer.current = window.setTimeout(() => {
      const tabs = tabsRef.current;
      if (!tabs || tabs.scrollWidth <= tabs.clientWidth) {
        scrollTimer.current = null;
        return;
      }

      const tabsCenter = tabs.scrollLeft + tabs.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      tabRefs.current.forEach((tab, index) => {
        if (!tab) return;
        const tabCenter = tab.offsetLeft + tab.clientWidth / 2;
        const distance = Math.abs(tabsCenter - tabCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      scrollTimer.current = null;
      setActiveIndex(closestIndex);
    }, 110);
  };

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % supportCategories.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + supportCategories.length) % supportCategories.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = supportCategories.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      selectCategory(nextIndex, true);
    }
  };

  useEffect(() => {
    const handleResize = () => centerTab(activeIndex, "auto");
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollTimer.current !== null) {
        window.clearTimeout(scrollTimer.current);
      }
    };
  }, [activeIndex, centerTab]);

  return (
    <section className="section support-section" id="support-areas">
      <div className="container">
        <motion.div
          className="section-header section-header--split support-section-header"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
        >
          <div>
            <span className="label label--sky">
              <Sparkles size={15} aria-hidden="true" />
              Areas I work with
            </span>
            <h2>Whatever feels heavy, we can begin by understanding it.</h2>
          </div>
          <div className="support-header-copy">
            <p className="lead">
              I work with all kinds of mental health, emotional, behavioral and
              clinical psychological concerns.
            </p>
            <p>
              This includes (but is not limited to) concerns like depression,
              anxiety, panic attacks, stress, trauma, mood disorders and many
              other psychological difficulties.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="support-explorer"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <div
            ref={tabsRef}
            className="support-explorer-tabs"
            role="tablist"
            aria-label="Choose an area of concern"
            onScroll={handleTabsScroll}
          >
            {supportCategories.map((category, index) => {
              const Icon = categoryIcons[category.id] ?? Sparkles;
              const isActive = index === activeIndex;
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
                <button
                  key={category.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  id={`support-tab-${category.id}`}
                  className={`support-explorer-tab support-explorer-tab--${category.tone}`}
                  data-position={position}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`support-panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectCategory(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className="support-explorer-tab-icon" aria-hidden="true">
                    <Icon size={21} strokeWidth={1.8} />
                  </span>
                  <span className="support-explorer-tab-copy">
                    <span>{category.concerns.length} areas</span>
                    <strong>{category.title}</strong>
                  </span>
                  <ChevronRight
                    className="support-explorer-tab-arrow"
                    size={18}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div
            className="support-explorer-cues"
            aria-label="Browse all areas of concern"
          >
            <button
              type="button"
              className="support-explorer-cue-button"
              onClick={() => selectCategory(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Show previous area"
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <div className="support-explorer-cue-copy">
              <span>Swipe or use the arrows</span>
              <div className="support-explorer-dots" aria-hidden="true">
                {supportCategories.map((category, index) => (
                  <span
                    key={category.id}
                    className={index === activeIndex ? "is-active" : ""}
                  />
                ))}
              </div>
              <strong>
                {activeIndex + 1} of {supportCategories.length} topics
              </strong>
            </div>
            <button
              type="button"
              className={`support-explorer-cue-button support-explorer-cue-button--next${
                activeIndex < supportCategories.length - 1 ? " is-inviting" : ""
              }`}
              onClick={() => selectCategory(activeIndex + 1)}
              disabled={activeIndex === supportCategories.length - 1}
              aria-label="Show next area"
            >
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Showing {supportCategories[activeIndex].title}, area {activeIndex + 1}
            {" "}of {supportCategories.length}
          </p>

          <div className="support-explorer-panels">
            {supportCategories.map((category, index) => {
              const Icon = categoryIcons[category.id] ?? Sparkles;
              const isActive = index === activeIndex;

              return (
                <div
                  key={category.id}
                  id={`support-panel-${category.id}`}
                  className={`support-explorer-panel support-explorer-panel--${category.tone}`}
                  role="tabpanel"
                  aria-labelledby={`support-tab-${category.id}`}
                  hidden={!isActive}
                  tabIndex={0}
                >
                  <motion.div
                    className={`support-explorer-visual support-explorer-visual--${category.id}`}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.34 }}
                  >
                    <Image
                      src="/images/illustrations/areas-of-support.webp"
                      alt={categoryIllustrationAlt[category.id]}
                      fill
                      sizes="(max-width: 719px) 92vw, (max-width: 1049px) 42vw, 390px"
                    />
                    <span className="support-explorer-visual-mark" aria-hidden="true">
                      <Icon size={25} strokeWidth={1.7} />
                    </span>
                  </motion.div>

                  <motion.div
                    className="support-explorer-detail"
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.34 }}
                  >
                    <p className="support-explorer-count">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {category.concerns.length} areas
                    </p>
                    <h3>{category.title}</h3>
                    <p className="support-explorer-prompt">Support can include</p>
                    <ul className="support-explorer-list">
                      {category.concerns.map((concern) => (
                        <li key={concern}>
                          <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                          <span>{concern}</span>
                        </li>
                      ))}
                      {category.id === "clinical" && (
                        <li className="support-explorer-more">
                          <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
                          <span>And more</span>
                        </li>
                      )}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="support-safety-note" role="note">
          <span className="support-safety-icon" aria-hidden="true">
            <LifeBuoy size={21} />
          </span>
          <p>
            <strong>Need urgent help?</strong> This website and booking service
            are not emergency services. If you or someone else is in immediate
            danger, contact local emergency services or go to the nearest
            emergency department.
          </p>
        </div>
      </div>
    </section>
  );
}
