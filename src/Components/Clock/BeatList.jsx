import React from 'react';
import styles from './Clock.module.css';
import { useMetronome } from '../Contexts/MetronomeContent';
import data from '../../rhythms.json';
import { statuses } from '../../helper';

const { rhythms } = data;

export default function BeatList({}) {
  const {
    state: { currentBeat, status, selectedId },
  } = useMetronome();

  const selectedItem = rhythms.find((el) => selectedId === el.id);

  return (
    <section>
      <ul className={styles.beatListContainer}>
        {Array.from({ length: Number(selectedItem.beats) })
          .fill()
          .map((_, i) => (
            <li
              className={`${styles.beatslist} ${selectedItem.accents.find((accent) => Number(accent) === i + 1) ? styles.accentBeat : ''} 
              ${currentBeat === i + 1 ? styles.currentBeat : ''}
              ${currentBeat === i + 1 && status === statuses.PLAYING ? styles.playingAnimation : ''}
            `}
              key={i}
            >
              {i + 1}
            </li>
          ))}
      </ul>
    </section>
  );
}
