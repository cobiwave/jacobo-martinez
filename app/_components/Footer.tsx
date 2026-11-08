import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <p className={styles.copy}>© 2026 Lorem Ipsum</p>
      <p className={styles.location}>Lorem ipsum, Dolor</p>
    </footer>
  );
}
