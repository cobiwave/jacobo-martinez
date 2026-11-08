import { SectionHeading } from "./SectionHeading";
import clsx from "clsx";
import styles from "./Contact.module.css";

const links = [
	{
		label: "Instagram — @cobiwave",
		href: "https://www.instagram.com/cobiwave/",
	},
	{
		label: "PASAJERO STUDIO — @pasajero.studio",
		href: "https://www.instagram.com/pasajero.studio/",
	},
];

export function Contact() {
	return (
		<section
			id="contact"
			className={clsx("container", styles.contact)}
			aria-labelledby="contact-title"
		>
			<SectionHeading id="contact-title" index="03" title="Contact" />

			<p className={styles.lead}>
				Have a project, a collaboration or a film in mind? Let&apos;s talk.
			</p>

			<a className={styles.email} href="mailto:cobimr@protonmail.com">
				cobimr@protonmail.com
			</a>

			<ul className={clsx("subgrid", styles.links)}>
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
