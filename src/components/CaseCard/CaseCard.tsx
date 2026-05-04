'use client';

import Image from 'next/image';
import styles from './CaseCard.module.scss';

type Props = {
  name: string;
  built: string;
  year: string;
  status: string;
  image: string;
  muted?: boolean;
};

export function CaseCard({ name, built, year, status, image, muted }: Props) {
  return (
    <article className={styles.card} data-muted={muted || undefined}>
      <div className={styles.media} aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          sizes="380px"
          className={styles.mediaImg}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.built}>{built}</p>
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.status}>{status}</span>
        </div>
      </div>
    </article>
  );
}
