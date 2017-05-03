import React from 'react';

export default function focusedPlaylist(currentPlaylist = null, action) {
  if (action.type === 'UPDATE_CURRENT_PLAYLIST') {
    return action.newPlaylist;
  }
  return currentPlaylist;
}
