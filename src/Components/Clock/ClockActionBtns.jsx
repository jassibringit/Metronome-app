import { useMetronome } from '../Contexts/MetronomeContent';
import styles from './Clock.module.css';
import { statuses } from '../../helper';
import useTimer from '../Timer/Timer';

export default function ClockActionBtns({}) {
  const {
    state: { status },
    setStatus,
    setSoundPlaying,
    soundPlaying,
  } = useMetronome();


  return (
    <section id={styles.btnSection}>
      <button
        id={styles.clockBtns}
        onClick={() => {
          setStatus(statuses.STOPPED);
        }}
      >
        🛑
      </button>
      <button
        id={styles.clockBtns}
        onClick={() => {
          status === statuses.PLAYING ? setStatus(statuses.PAUSED) : setStatus(statuses.PLAYING);
          
        }}
      >
        {status ===  statuses.PLAYING  ? '⏸' : '▶'  }
      </button>

      <button
        id={styles.clockBtns}
        onClick={() => {
          setSoundPlaying(false);
        }}
      >
        {soundPlaying ? '🔊' : '🔇'}
      </button>
    </section>
  );
}
