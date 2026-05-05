import { content } from '@/lib/content';
import styles from '../Editorial/Editorial.module.scss';

export function Background() {
  const { eyebrow, milestones } = content.background;

  return (
    <section className={styles.section} aria-labelledby="background-title">
      <div className={styles.inner}>
        <div>
          <h2 id="background-title" className={styles.eyebrow}>{eyebrow}</h2>
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
