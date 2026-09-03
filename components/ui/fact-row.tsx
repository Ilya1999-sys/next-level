"use client";

import { useLayoutEffect, useRef, useState } from "react";

function countLines(el: HTMLElement) {
  const cs = getComputedStyle(el);
  const lh = parseFloat(cs.lineHeight);
  const size = parseFloat(cs.fontSize);
  const unit = Number.isFinite(lh) && lh > 0 ? lh : size * 1.25;
  return el.getBoundingClientRect().height / unit;
}

export function FactRow({ value, text }: { value: string; text: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [stack, setStack] = useState(false);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const copy = textRef.current;
    if (!row || !copy) return;

    let locked = false;

    function measure() {
      if (locked || !row || !copy) return;
      locked = true;
      row.classList.add("fact-row--measure");
      const next = countLines(copy) >= 2.5;
      row.classList.remove("fact-row--measure");
      setStack((prev) => (prev === next ? prev : next));
      requestAnimationFrame(() => {
        locked = false;
      });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [value, text]);

  return (
    <div className="fact-row" ref={rowRef} data-stack={stack ? "true" : "false"}>
      <p className="type-h2 fact-number">{value}</p>
      <p className="type-t2" ref={textRef}>
        {text}
      </p>
    </div>
  );
}
