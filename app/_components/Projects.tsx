import { SectionHeading } from "./SectionHeading";
import clsx from "clsx";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Lorem ipsum",
    year: "2026",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    tags: ["Lorem", "Ipsum"],
  },
  {
    title: "Dolor sit amet consectetur adipiscing",
    year: "2025",
    description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    tags: ["Dolor", "Sit", "Amet"],
  },
  {
    title: "Consectetur",
    year: "2025",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.",
    tags: ["Elit"],
  },
  {
    title: "Adipiscing elit",
    year: "2024",
    description: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["Sed", "Do", "Eiusmod", "Tempor"],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className={clsx("container", styles.projects)}
      aria-labelledby="projects-title"
    >
      <SectionHeading id="projects-title" index="02" title="Projects" />

      <p className={styles.intro}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt.
      </p>

      <ul className={clsx("subgrid", styles.list)}>
        {projects.map((project) => (
          <li key={project.title} className={styles.card}>
            <div className={styles.media} aria-hidden="true" />
            <h3 className={styles.title}>{project.title}</h3>
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
