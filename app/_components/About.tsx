import { SectionHeading } from "./SectionHeading";
import styles from "./About.module.css";

const facts = [
  {
    title: "Lorem ipsum",
    text: "Dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    title: "Dolor sit amet consectetur",
    text: "Tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Adipiscing",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    title: "Sed eiusmod",
    text: "Duis aute irure dolor in reprehenderit.",
  },
];

export function About() {
  return (
    <section id="about" className={`container ${styles.about}`} aria-labelledby="about-title">
      <SectionHeading id="about-title" index="01" title="About" />

      <p className={styles.statement}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </p>

      <div className={`subgrid ${styles.body}`}>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem.
        </p>
      </div>

      <ul className={`subgrid ${styles.facts}`}>
        {facts.map((fact) => (
          <li key={fact.title} className={styles.fact}>
            <h3 className={styles.factTitle}>{fact.title}</h3>
            <p className={styles.factText}>{fact.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
