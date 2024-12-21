import React from 'react';
import { useMetronome } from '../Contexts/MetronomeContent';
import BeatList from './BeatList';
import ClockActionBtns from './ClockActionBtns';
import styles from './Clock.module.css';
import { formatTime } from '../../helper';

export default function SelectedRythm({ timer, }) {
  const {
    state: { selectedId, bpm },
    setBpm,
  } = useMetronome();

  return (
    <>
      <h2 id={styles.name}> {selectedId.name} </h2>
      <div id={styles.clockActionBtns}>
        <h2> {bpm} bpm </h2>
        <input
          type="range"
          min="40"
          max="200"
          value={bpm}
          onChange={(e) => {
            setBpm(e.target.value);
          }}
        />
        <ClockActionBtns />
      </div>
      <h2 className={styles.timer}>{formatTime(timer)}</h2>
      <BeatList />
    </>
  );
}
