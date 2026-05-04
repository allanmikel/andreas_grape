import { content } from '@/lib/content';
import styles from '../Editorial/Editorial.module.scss';

export function RoadAhead() {
  const { eyebrow, title, items } = content.roadAhead;

  return (
    <section className={styles.section} aria-labelledby="road-ahead-title">
      <div className={styles.inner}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="road-ahead-title" className={styles.title}>{title}</h2>
        </div>

        <div className={styles.body}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.year} className={styles.row}>
                <span className={styles.rowKey}>{item.year}</span>
                <span className={styles.rowText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
