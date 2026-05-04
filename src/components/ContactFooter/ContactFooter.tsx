import { content } from '@/lib/content';
import styles from './ContactFooter.module.scss';

export function ContactFooter() {
  const { email, linkedin } = content.meta;

  return (
    <footer className={styles.footer} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <span className={styles.eyebrow} id="contact-title">Contact</span>
        <ul className={styles.links}>
          <li>
            <a className={styles.link} href={`mailto:${email}`}>
              {email}
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <span className={styles.meta}>{content.footer.left}</span>
      </div>
    </footer>
  );
}
