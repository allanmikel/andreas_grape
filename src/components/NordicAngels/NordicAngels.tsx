import { content } from '@/lib/content';
import styles from '../Editorial/Editorial.module.scss';

export function NordicAngels() {
  const { eyebrow, title, body, lines, link } = content.nordicAngelsOverview;
  const external = /^https?:\/\//.test(link.href);

  return (
    <section className={styles.section} aria-labelledby="nordic-angels-title">
      <div className={styles.inner}>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="nordic-angels-title" className={styles.title}>{title}</h2>
        </div>

        <div className={styles.body}>
          <p className={styles.lead}>{body}</p>

          <ul className={styles.list}>
            {lines.map((line, i) => (
              <li key={line} className={styles.row}>
                <span className={styles.rowKey}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rowText}>{line}</span>
              </li>
            ))}
          </ul>

          <a
            className={styles.link}
            href={link.href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span>{link.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
