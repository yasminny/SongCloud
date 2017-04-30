import React from 'react';


export default function heartWasClicked (state = { songId : 0, playlistId: 0}, action) {
  let currentState = state;
  if (action.type === 'A_HEART_WAS_CLICKED') {

    currentState = {
      songId: action.songId,
      playlistId: action.playlistId
    };
    return currentState;
  }
  return currentState;
}
