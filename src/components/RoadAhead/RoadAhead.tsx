import { content } from '@/lib/content';
import styles from '../Editorial/Editorial.module.scss';

export function RoadAhead() {
  const { eyebrow, items } = content.roadAhead;

  return (
    <section className={styles.section} aria-labelledby="road-ahead-title">
      <div className={styles.inner}>
        <div>
          <h2 id="road-ahead-title" className={styles.eyebrow}>{eyebrow}</h2>
        </div>

        <div className={styles.body}>
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={i} className={styles.row}>
                <span className={styles.rowKey}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rowText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
