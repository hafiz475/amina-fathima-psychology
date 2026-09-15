"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const previousOverflow = document.body.style.overflow;
    const previousBusy = document.body.getAttribute("aria-busy");
    const loader = document.querySelector(".site-loader");
    const pageSiblings = Array.from(document.body.children)
      .filter((element): element is HTMLElement =>
        element instanceof HTMLElement && element !== loader,
      )
      .map((element) => ({ element, wasInert: element.inert }));

    document.body.style.overflow = "hidden";
    document.body.setAttribute("aria-busy", "true");
    pageSiblings.forEach(({ element }) => {
      element.inert = true;
    });

    const restorePage = () => {
      document.body.style.overflow = previousOverflow;
      if (previousBusy === null) {
        document.body.removeAttribute("aria-busy");
      } else {
        document.body.setAttribute("aria-busy", previousBusy);
      }
      pageSiblings.forEach(({ element, wasInert }) => {
        element.inert = wasInert;
      });
    };

    const leaveTimer = window.setTimeout(
      () => setLeaving(true),
      reduceMotion ? 80 : 1050,
    );
    const hideTimer = window.setTimeout(
      () => {
        setVisible(false);
        restorePage();
      },
      reduceMotion ? 140 : 1420,
    );

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      restorePage();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader${leaving ? " site-loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Sirat"
    >
      <span className="site-loader-orbit site-loader-orbit--one" aria-hidden="true" />
      <span className="site-loader-orbit site-loader-orbit--two" aria-hidden="true" />
      <div className="site-loader-center">
        <span className="site-loader-logo-wrap" aria-hidden="true">
          <span className="site-loader-halo" />
          <Image
            src="/images/brand/sirat-tree-logo.png"
            alt=""
            width={156}
            height={156}
            preload
          />
        </span>
        <p>sirat</p>
        <small>A gentle beginning</small>
        <span className="site-loader-steps" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
