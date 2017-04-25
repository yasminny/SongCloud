import React from 'react';

export default function isPlaying(isPlaying = false, action){
  if (action.type === 'CHANGE_IS_PLAYING'){
    return !isPlaying;
  }
  if (action.type === 'CHANGE_IS_PLAYING_VIA_PLAYER'){
    return action.value;
  }
  return !isPlaying;
}
