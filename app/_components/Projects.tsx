import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import clsx from "clsx";
import styles from "./Projects.module.css";
import pasajeroCover from "@/public/pasajero.studio_.jpg";

const projects = [
	{
		title: "PASAJERO Studio",
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
	return (
		<section
			id="projects"
			className={clsx("container", styles.projects)}
			aria-labelledby="projects-title"
		>
			<SectionHeading id="projects-title" index="02" title="Projects" />

			<p className={styles.intro}>
				A selection of recent work, from concept to deployment. Each project
				balances solid engineering with a strong visual identity, built to
				perform as well as it looks.
			</p>

			<ul className={clsx("subgrid", styles.list)}>
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
