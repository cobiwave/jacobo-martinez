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
import { SectionHeading } from "./SectionHeading";
import styles from "./Contact.module.css";

const links = [
  {
    label: "Instagram — @cobiwave",
    href: "https://www.instagram.com/cobiwave/",
  },
  {
    label: "@pasajero.studio",
    href: "https://www.instagram.com/pasajero.studio/",
  },
];

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useMotion(containerRef, {
    full: () => {
      const lead = splitWords(leadRef.current);

      revealTimeline(containerRef.current)
        .from(childrenOf(headingRef.current), {
          autoAlpha: 0,
          y: 16,
          stagger: motion.stagger.words,
        })
        .from(
          lead.words,
          { yPercent: motion.maskOffset, stagger: motion.stagger.words },
          "<0.2",
        )
        // Not split: its underline wouldn't carry over to the split words.
        .from(emailRef.current, { autoAlpha: 0, y: motion.y }, "<0.3")
        .from(
          childrenOf(linksRef.current),
          { autoAlpha: 0, y: motion.y, stagger: motion.stagger.items },
          "<0.3",
        );
    },
  });

  return (
    <section
      ref={containerRef}
      data-reveal
      id="contact"
      className={clsx("container", styles.contact)}
      aria-labelledby="contact-title"
    >
      <SectionHeading
        ref={headingRef}
        id="contact-title"
        index="03"
        title="Contact"
      />

      <p ref={leadRef} className={styles.lead}>
        Have a project, a collaboration or a film in mind? Let&apos;s talk.
      </p>

      <a
        ref={emailRef}
        className={styles.email}
        href="mailto:cobimr@protonmail.com"
      >
        cobimr@protonmail.com
      </a>

      <ul ref={linksRef} className={clsx("subgrid", styles.links)}>
        {links.map((link) => (
          <li key={link.href} className={styles.link}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
