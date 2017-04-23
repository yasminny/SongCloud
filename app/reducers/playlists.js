import React from 'react';


export default function playlists(playlists = [], action) {
  // let currentPlaylists = currentPlaylists || playlists;

  if(action.type === 'GET_XHR_PLAYLISTS'){
    return action.serverPlaylists;
  }
  if (action.type === 'CREATE_NEW_PLAYLIST') {
    // const newId = action.newId;
    const newPlaylist = action.newPlaylist;
    // const redirectTo = action.redirectTo;

    playlists.push(newPlaylist);

    return playlists;
  }
  if (action.type === 'UPDATE_PLAYLIST_TITLE') {
    const index = action.selectedPlaylistIndex;
    const value = action.newPlaylistTitle;

    playlists[index].title = value;

    return playlists;
  }
  if (action.type === 'DELETE_PLATLIST') {
    const index = action.selectedPlaylistIndex;

    playlists.splice(index, 1);

    return playlists;
  }
  if (action.type === 'UPDATE_PLAYLIST_FOCUS_MODE') {
    const index = action.selectedPlaylistIndex;

    playlists[index].isFocusMode = !playlists[index].isFocusMode;

    return playlists;
  }

  return playlists;
}





