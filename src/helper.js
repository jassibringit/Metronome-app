export const types = {
  SET_SELECTED_ITEM : "setSelectedItem",
  SET_CURRENT_BEAT : "setCurrentBeat",
  SET_BPM: 'setBpm',
  SET_STATUS:"setStatus",
  SET_SOUND_PLAYING:"setSoundPlaying",
  SET_PLAYING_TIMER : "setPlayingTimer"
}

export const statuses = {
  PLAYING:"playing",
  STOPPED:"stopped",
  PAUSED:"paused"
}


export function formatTime(totalSecs){
  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};