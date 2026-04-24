"use client";

import { useEffect, useMemo, useState } from "react";

export function HomeScrollFX() {
  const [progress, setProgress] = useState(0);

  const original = useMemo(() => {
    if (typeof window === "undefined") return null;
    return {
      htmlScrollSnapType: document.documentElement.style.scrollSnapType,
      bodyScrollSnapType: document.body.style.scrollSnapType,
      htmlScrollPaddingTop: document.documentElement.style.scrollPaddingTop,
      bodyScrollPaddingTop: document.body.style.scrollPaddingTop,
      htmlScrollBehavior: document.documentElement.style.scrollBehavior,
      bodyScrollBehavior: document.body.style.scrollBehavior,
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Apply “section snapping” only on Home route.
    html.style.scrollSnapType = "y mandatory";
    body.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "88px"; // header offset
    body.style.scrollPaddingTop = "88px";
    html.style.scrollBehavior = "smooth";
    body.style.scrollBehavior = "smooth";

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, scrollTop / max)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (!original) return;
      html.style.scrollSnapType = original.htmlScrollSnapType;
      body.style.scrollSnapType = original.bodyScrollSnapType;
      html.style.scrollPaddingTop = original.htmlScrollPaddingTop;
      body.style.scrollPaddingTop = original.bodyScrollPaddingTop;
      html.style.scrollBehavior = original.htmlScrollBehavior;
      body.style.scrollBehavior = original.bodyScrollBehavior;
    };
  }, [original]);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}

