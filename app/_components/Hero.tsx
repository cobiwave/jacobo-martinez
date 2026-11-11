"use client";

import gsap from "gsap";
import clsx from "clsx";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP, SplitText);

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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The section is hidden in CSS to avoid a flash before hydration;
      // every branch must reveal it.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(containerRef.current, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(titleRef.current, {
          type: "words",
          mask: "words",
        });
        const metaItems = gsap.utils.toArray<HTMLElement>(
          metaRef.current?.children ?? [],
        );

        gsap
          .timeline({ defaults: { duration: 1.2, ease: "expo.out" } })
          .set(containerRef.current, { autoAlpha: 1 })
          .from([nameRef.current, roleRef.current], {
            autoAlpha: 0,
            y: 16,
            stagger: 0.08,
          })
          .from(split.words, { yPercent: 100, stagger: 0.08 }, "<0.2")
          .from(introRef.current, { autoAlpha: 0, y: 24 }, "<0.5")
          .from(metaItems, { autoAlpha: 0, y: 24, stagger: 0.1 }, "<0.15");
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
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
