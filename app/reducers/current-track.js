import React from 'react';

export default function currentTrack(currentTrack = null, action) {
  if (action.type === 'UPDATE_CURRENT_TRACK') {
    return action.currentTrack;
  }
  return currentTrack;
}
