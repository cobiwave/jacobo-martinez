import { SectionHeading } from "./SectionHeading";
import styles from "./Contact.module.css";

const links = [
  { label: "Lorem", href: "#" },
  { label: "Ipsum", href: "#" },
  { label: "Dolor", href: "#" },
  { label: "Sit amet", href: "#" },
];

export function Contact() {
  return (
    <section id="contact" className={`container ${styles.contact}`} aria-labelledby="contact-title">
      <SectionHeading id="contact-title" index="03" title="Contact" />

      <p className={styles.lead}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
      </p>

      <a className={styles.email} href="mailto:hello@loremipsum.com">
        hello@loremipsum.com
      </a>

      <ul className={`subgrid ${styles.links}`}>
        {links.map((link) => (
          <li key={link.label} className={styles.link}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
