import React, { createContext, useReducer, useContext } from 'react';
import { statuses, types } from '../../helper.js';


const {
  SET_SELECTED_ITEM,
  SET_CURRENT_BEAT,
  SET_BPM,
  SET_STATUS,
  SET_SOUND_PLAYING,
} = types;

const initialState = {
  selectedId: null,
  currentBeat: 1,
  bpm: 100,
  soundPlaying: true,
  status: 'initialized',
};

const updateKeyByPayload = (key) => (state, payload) => ({
  ...state,
  [key]: payload,

});

const actionMap = {
  [SET_SELECTED_ITEM]: updateKeyByPayload('selectedId'),

  [SET_CURRENT_BEAT]: (state, payload) => ({
    ...state,
    currentBeat: state.currentBeat >= payload ? 1 : state.currentBeat + 1,
  }),

  [SET_BPM]: updateKeyByPayload('bpm'),
  [SET_STATUS]: (state,payload) => ({
    ...state,
    status : payload,
    ...(payload === statuses.STOPPED && { currentBeat: 1 }), 
  }),
  [SET_SOUND_PLAYING]: (state, payload) => ({
    ...state,
    soundPlaying: !state.soundPlaying,
  }),
};

function reducer(state, { type, payload }) {
  const handler = actionMap[type];
  if (handler) {
    return handler(state, payload);
  }
  throw Error('Unknown action: ' + type);
}

const MetronomeContext = createContext();

export default function MetronomeProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const setSelectedItem = (payload) =>
    dispatch({ type: SET_SELECTED_ITEM, payload });

  const setCurrentBeat = (payload) =>
    dispatch({ type: SET_CURRENT_BEAT, payload });

  const setBpm = (payload) => dispatch({ type: SET_BPM, payload });
  const setStatus = (payload) => dispatch({ type: SET_STATUS, payload });
  const setSoundPlaying = (payload) =>
    dispatch({ type: SET_SOUND_PLAYING, payload });

  return (
    <MetronomeContext.Provider
      value={{
        state,
        setSelectedItem,
        setCurrentBeat,
        setBpm,
        setStatus,
        setSoundPlaying,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
}

export function useMetronome() {
  const context = useContext(MetronomeContext);
  if (!context) {
    throw new Error('useMetronome must be used within a MetronomeProvider');
  }
  return context;
}
