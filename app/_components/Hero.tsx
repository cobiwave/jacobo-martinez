import styles from "./Hero.module.css";

const meta = [
  { label: "Lorem", value: "Ipsum dolor" },
  { label: "Sit amet", value: "Consectetur adipiscing" },
  { label: "Elit", value: "Sed do eiusmod" },
];

export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <p className={styles.name}>Lorem Ipsum</p>
      <p className={styles.role}>Dolor sit amet</p>

      <h1 id="hero-title" className={styles.title}>
        Lorem ipsum dolor sit amet, consectetur adipiscing.
      </h1>

      <p className={styles.intro}>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation.
      </p>

      <dl className={`subgrid ${styles.meta}`}>
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
