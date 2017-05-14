import React from 'react';

export default function isPaused(paused = false, action){
  if (action.type === 'CHANGE_IS_PLAYING_VIA_PLAYER'){
    return action.value;
  }
  if (action.type === 'SET_PLAYING_MODE'){
    return action.value;
  }

  return paused;
}
