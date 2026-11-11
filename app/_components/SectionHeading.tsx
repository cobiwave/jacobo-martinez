import type { Ref } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  id: string;
  index: string;
  title: string;
  ref?: Ref<HTMLDivElement>;
};

export function SectionHeading({ id, index, title, ref }: Props) {
  return (
    <div ref={ref} className={styles.heading}>
      <span className={styles.index}>({index})</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
