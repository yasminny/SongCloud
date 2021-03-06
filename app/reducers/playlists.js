import React from 'react';


export default function playlists(playlists = [], action) {
  let currentPlaylists = [...playlists];

  if (action.type === 'GET_XHR_PLAYLISTS') {
    return action.serverPlaylists;
  }
  if (action.type === 'CREATE_NEW_PLAYLIST') {
    const newPlaylist = action.newPlaylist;

    currentPlaylists.push(newPlaylist);

    return currentPlaylists;
  }
  if (action.type === 'UPDATE_PLAYLIST_TITLE') {
    const index = action.selectedPlaylistIndex;

    currentPlaylists[index].title = action.newPlaylistTitle;

    return currentPlaylists;
  }
  if (action.type === 'DELETE_PLATLIST') {
    const index = action.selectedPlaylistIndex;

    currentPlaylists.splice(index, 1);

    return currentPlaylists;
  }
  if (action.type === 'UPDATE_PLAYLIST_FOCUS_MODE') {
    const index = action.selectedPlaylistIndex;

    currentPlaylists[index].isFocusMode = !currentPlaylists[index].isFocusMode;

    return currentPlaylists;
  }
  if (action.type === 'UPDATE_SONG_IN_PLAYLIST') {

    return action.currentPlaylists;
  }

  return currentPlaylists;
}





