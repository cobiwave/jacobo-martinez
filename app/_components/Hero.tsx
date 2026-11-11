"use client";

import clsx from "clsx";
import { useRef } from "react";
import {
  childrenOf,
  motion,
  revealTimeline,
  splitWords,
  useMotion,
} from "@/app/_lib/motion";
import styles from "./Hero.module.css";

const meta = [
  { label: "Experience", value: "6+ years" },
  { label: "Based in", value: "Buenos Aires, Argentina" },
  { label: "Languages", value: "Spanish, English" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDListElement>(null);

  useMotion(containerRef, {
    full: () => {
      const split = splitWords(titleRef.current);

      revealTimeline()
        .from([nameRef.current, roleRef.current], {
          autoAlpha: 0,
          y: 16,
          stagger: motion.stagger.words,
        })
        .from(
          split.words,
          { yPercent: 100, stagger: motion.stagger.words },
          "<0.2",
        )
        .from(introRef.current, { autoAlpha: 0, y: motion.y }, "<0.5")
        .from(
          childrenOf(metaRef.current),
          { autoAlpha: 0, y: motion.y, stagger: motion.stagger.items },
          "<0.15",
        );
    },
  });

  return (
    <section
      ref={containerRef}
      data-reveal
      className={clsx("container", styles.hero)}
      aria-labelledby="hero-title"
    >
      <p ref={nameRef} className={styles.name}>
        Jacobo Martínez
      </p>
      <p ref={roleRef} className={styles.role}>
        Frontend Engineer
      </p>

      <h1 ref={titleRef} id="hero-title" className={styles.title}>
        Functional, visually elegant digital experiences.
      </h1>

      <p ref={introRef} className={styles.intro}>
        Frontend engineer with six years at top-tier digital agencies like
        Monks, building websites and apps for Adidas, Amazon, HP and Intuit.
      </p>

      <dl ref={metaRef} className={clsx("subgrid", styles.meta)}>
        {meta.map((item) => (
          <div key={item.label} className={styles.metaItem}>
            <dt className={styles.metaLabel}>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
