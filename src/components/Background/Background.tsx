import { content } from '@/lib/content';
import styles from '../Editorial/Editorial.module.scss';

export function Background() {
  const { eyebrow, title, milestones, place } = content.background;

  return (
    <section className={styles.section} aria-labelledby="background-title">
      <div className={styles.inner}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="background-title" className={styles.title}>{title}</h2>
          <span className={styles.place}>{place}</span>
        </div>

        <div className={styles.body}>
          <ul className={styles.list}>
            {milestones.map((m, i) => (
              <li key={i} className={styles.row}>
                <span className={styles.rowKey}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rowText}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
