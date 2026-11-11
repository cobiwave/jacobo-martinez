import { SectionHeading } from "./SectionHeading";
import clsx from "clsx";
import styles from "./About.module.css";

const facts = [
	{
		title: "Agencies",
		text: "Six years engineering frontends at high-calibre digital agencies such as Monks.",
	},
	{
		title: "Clients",
		text: "Adidas, Amazon, HP, Intuit and other global brands.",
	},
	{
		title: "PASAJERO",
		text: "Founder of a filmmaking and photography studio focused on cinematography and video direction.",
	},
	{
		title: "Buenos Aires",
		text: "Based in Argentina. Native Spanish, professional English.",
	},
];

export function About() {
	return (
		<section
			id="about"
			className={clsx("container", styles.about)}
			aria-labelledby="about-title"
		>
			<SectionHeading id="about-title" index="01" title="About" />

			<p className={styles.statement}>
				I build websites and apps that work flawlessly and look effortless,
				where engineering meets a filmmaker&apos;s eye.
			</p>

			<div className={clsx("subgrid", styles.body)}>
				<p>
					For the past six years I&apos;ve worked as a frontend engineer at
					leading digital agencies like Monks, crafting digital experiences for
					brands such as Adidas, Amazon, HP and Intuit — balancing solid,
					functional code with a refined visual finish.
				</p>
				<p>
					Beyond code, I&apos;m the founder of PASAJERO, a filmmaking and
					photography studio where I express my artistic vision through
					cinematography and video direction. That visual sensibility shapes
					every interface I build.
				</p>
			</div>

			<ul className={clsx("subgrid", styles.facts)}>
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
