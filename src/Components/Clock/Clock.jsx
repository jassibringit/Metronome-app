import React, { useEffect } from 'react';
import styles from './Clock.module.css';
import useTimer from '../Timer/Timer';
import { useMetronome } from '../Contexts/MetronomeContent';

import data from '../../rhythms.json';
import SelectedRythm from './SelectedRythm';
import { statuses } from '../../helper';

const { rhythms } = data;
const clickSound = new Audio('/sounds/metronome.mp3');

export default function Clock({}) {
  const {
    state: { bpm, status, soundPlaying, selectedId },
    setCurrentBeat,
  } = useMetronome();
  const selectedItem = rhythms.find((el) => selectedId === el.id);
  const { timer, startTimer, pauseTimer, resetTimer } = useTimer(0);

  useEffect(() => {
    if (!selectedItem) return;

    const timerActions = {
      [statuses.STOPPED]: resetTimer,
      [statuses.PAUSED]: pauseTimer,
      [statuses.PLAYING]: startTimer,
    };

    timerActions[status]?.();
  }, [selectedItem, status]);

  const beat = () => {
    if (status === statuses.PLAYING) {
      clickSound.currentTime = 0;
      if (!soundPlaying) {
        clickSound.pause();
      } else {
        clickSound.play();
      }
      const totalBeats = Number(selectedItem.beats);
      setCurrentBeat(totalBeats);
    }
  };

  useEffect(() => {
    if (!selectedItem) return;

    const createIntervalTimeBasedOnBpm = 60000 / bpm;
    let intervalId;
    if (status === statuses.PLAYING) {
      intervalId = setInterval(beat, createIntervalTimeBasedOnBpm);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedItem, bpm, status, soundPlaying]);

  return (
    <section className={`${styles.container} pm`}>
      {!selectedItem && <h2> Select a palo to see the clock </h2>}
      {selectedItem && (
        <SelectedRythm timer={timer} selectedItem={selectedItem} />
      )}
    </section>
  );
}
