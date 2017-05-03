import React from 'react';

export default function isPlaying(playing = false, action){
  if (action.type === 'CHANGE_IS_PLAYING_VIA_PLAYER'){
    console.log('CHANGE_IS_PLAYING_VIA_PLAYER');
    return action.value;
  }
  if (action.type === 'SET_PLAYING_MODE'){
    console.log('SET_PLAYING_MODE');
    return action.value;
  }

  return playing;
}
