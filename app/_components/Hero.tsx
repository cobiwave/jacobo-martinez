import styles from "./Hero.module.css";

const meta = [
	{ label: "Experience", value: "6+ years" },
	{ label: "Based in", value: "Buenos Aires, Argentina" },
	{ label: "Languages", value: "Spanish, English" },
];

export function Hero() {
	return (
		<section
			className={`container ${styles.hero}`}
			aria-labelledby="hero-title"
		>
			<p className={styles.name}>Jacobo Martínez</p>
			<p className={styles.role}>Frontend Engineer</p>

			<h1 id="hero-title" className={styles.title}>
				Functional, visually elegant digital experiences.
			</h1>

			<p className={styles.intro}>
				Frontend engineer with six years at top-tier digital agencies like
				Monks, building websites and apps for Adidas, Amazon, HP and Intuit.
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
