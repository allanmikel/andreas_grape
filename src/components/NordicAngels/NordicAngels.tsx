'use client';

import { content } from '@/lib/content';
import { RevealTrigger } from '@/components/EditorialReveal/RevealTrigger';
import editorial from '../Editorial/Editorial.module.scss';
import styles from './NordicAngels.module.scss';

export function NordicAngels() {
  const { eyebrow, title, body, layers, link } = content.nordicAngelsOverview;
  const external = /^https?:\/\//.test(link.href);

  return (
    <section className={editorial.section} aria-labelledby="nordic-angels-title">
      <div className={editorial.inner}>
        <div>
          <span className={editorial.eyebrow}>{eyebrow}</span>
          <h2 id="nordic-angels-title" className={editorial.title}>{title}</h2>
        </div>

        <div className={editorial.body}>
          <p className={editorial.lead}>{body}</p>

          <ul className={editorial.list}>
            {layers.map((layer, i) => (
              <li key={layer.slug} className={editorial.row}>
                <span className={editorial.rowKey}>{String(i + 1).padStart(2, '0')}</span>
                <RevealTrigger item={layer} className={styles.rowTrigger}>
                  <span className={styles.rowName}>{layer.title}</span>
                  {layer.category ? (
                    <span className={styles.rowCategory}> · {layer.category}</span>
                  ) : null}
                  <span className={styles.rowArrow} aria-hidden="true">→</span>
                </RevealTrigger>
              </li>
            ))}
          </ul>

          <a
            className={editorial.link}
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
