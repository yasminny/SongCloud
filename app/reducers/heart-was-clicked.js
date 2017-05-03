import React from 'react';


export default function heartWasClicked (state = {
  songId : 0,
  playlistId: 0,
  displayDropdown: false}, action) {
  let currentState = state;
  if (action.type === 'A_HEART_WAS_CLICKED') {

    currentState = {
      songId: action.songId,
      playlistId: action.playlistId,
      displayDropdown: action.displayDropdown
    };
    return currentState;
  }
  return currentState;
}
