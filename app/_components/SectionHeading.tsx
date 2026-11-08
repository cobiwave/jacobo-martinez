import styles from "./SectionHeading.module.css";

type Props = {
  id: string;
  index: string;
  title: string;
};

export function SectionHeading({ id, index, title }: Props) {
  return (
    <div className={styles.heading}>
      <span className={styles.index}>({index})</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
