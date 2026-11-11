"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRef } from "react";
import {
  childrenOf,
  motion,
  revealTimeline,
  useMotion,
} from "@/app/_lib/motion";
import { SectionHeading } from "./SectionHeading";
import styles from "./Projects.module.css";
import pasajeroCover from "@/public/pasajero.studio_.jpg";

const projects = [
  {
    title: "PASAJERO",
    year: "2026",
    url: "https://pasajero.studio",
    description:
      "Official website for my filmmaking and photography studio. A cinematic, image-first showcase of our work in cinematography and video direction, built with Next.js.",
    tags: ["Next.js", "React", "Design & Development"],
    image: {
      src: pasajeroCover,
      alt: "Pasajero Studio website homepage",
    },
  },
];

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useMotion(containerRef, {
    full: () => {
      revealTimeline(containerRef.current)
        .from(childrenOf(headingRef.current), {
          autoAlpha: 0,
          y: 16,
          stagger: motion.stagger.words,
        })
        .from(introRef.current, { autoAlpha: 0, y: motion.y }, "<0.2");

      // One trigger per card, so each reveals as it scrolls into view.
      for (const card of childrenOf(listRef.current)) {
        const [media, ...details] = childrenOf(card);

        revealTimeline(card)
          // Image wipes up from the bottom edge while settling from a slight zoom.
          .from(media, { clipPath: "inset(100% 0% 0% 0%)" })
          .from(media.querySelector("img"), { scale: 1.2 }, "<")
          .from(
            details,
            { autoAlpha: 0, y: motion.y, stagger: motion.stagger.items },
            "<0.3",
          );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      data-reveal
      id="projects"
      className={clsx("container", styles.projects)}
      aria-labelledby="projects-title"
    >
      <SectionHeading
        ref={headingRef}
        id="projects-title"
        index="02"
        title="Projects"
      />

      <p ref={introRef} className={styles.intro}>
        A selection of recent work, from concept to deployment. Each project
        balances solid engineering with a strong visual identity, built to
        perform as well as it looks.
      </p>

      <ul ref={listRef} className={clsx("subgrid", styles.list)}>
        {projects.map((project) => (
          <li key={project.title} className={styles.card}>
            <div className={styles.media}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                placeholder="blur"
                sizes="(width >= 75em) 50vw, (width >= 48em) 50vw, 100vw"
              />
            </div>
            <h3 className={styles.title}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {project.title}
              </a>
            </h3>
            <p className={styles.year}>{project.year}</p>
            <p className={styles.description}>{project.description}</p>
            <ul className={styles.tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
