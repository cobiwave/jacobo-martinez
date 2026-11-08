import { cacheLife } from "next/cache";
import clsx from "clsx";
import styles from "./Footer.module.css";

/* Cached so the page stays static; revalidates daily to roll over on Jan 1. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className={clsx("container", styles.footer)}>
      <p className={styles.copy}>
        © <CurrentYear /> Jacobo Martínez
      </p>
      <p className={styles.location}>Buenos Aires, Argentina</p>
    </footer>
  );
}
