import React from 'react';
import styles from './Rhythm.module.css';
import { useMetronome } from '../Contexts/MetronomeContent';
import  data from '../../rhythms.json'
import useTimer from '../Timer/Timer';

const { rhythms } = data;
export default function Rhythms({}) {
  const {
    state: {  selectedId },
    setSelectedItem,
    setCurrentBeat,
  } = useMetronome();

  const{ resetTimer }  = useTimer(); 

  const selectedItem = rhythms.find((el) => selectedId === el.id);
  const listOnClick = (id) => {
    setSelectedItem(id);
    setCurrentBeat(1);
    resetTimer();
  };

  return (
    <section className={`${styles.rhythm} pm flex-col`}>
      <h2 id={styles.heading}> Select A Rhythm</h2>
      <ul id={styles.listCont}>
        {rhythms.map((el) => (
          <li
            onClick={() => listOnClick(el.id)}
            className={`${styles.rhythmList} ${selectedItem?.id === el.id ? styles.selected : ''}`}
            key={el.id}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
