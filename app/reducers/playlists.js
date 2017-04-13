export default function playlists(playlists = [{
                                    id: 1,
                                    title: 'test',
                                    isFocusMode: false,
                                    songs: []
                                  }], action) {
  let currentPlaylists = currentPlaylists || playlists;

  if (action.type === 'CREATE_NEW_PLAYLIST') {
    const newId = action.newId;
    const newSong = action.newSong;
    const redirectTo = action.redirectTo;
    const playlistSongs = newSong ? [newSong] : [];

    currentPlaylists.push({
      // id: uuid(),
     id: newId,
      title: 'Untitled',
      isFocusMode: true,
      songs: playlistSongs
    });

    return currentPlaylists;
  }
  if (action.type === 'UPDATE_PLAYLIST_TITLE') {
    const index = action.selectedPlaylistIndex;
    const value = action.newPlaylistTitle;

    currentPlaylists[index].title = value;

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

  return currentPlaylists;
}





