import {createStore, combineReducers} from 'redux';
import heartWasClicked from './reducers/heart-was-clicked';
import playlists from './reducers/playlists';
import currentTrack from './reducers/current-track';
import isPlaying from './reducers/is-playing';
import focusedPlaylist from './reducers/focused-playlist';
import ServerLocation from './serverLocation'

const reducer = combineReducers({
  heartWasClicked,
  currentTrack,
  playlists,
  isPlaying,
  focusedPlaylist
});

const store = createStore(reducer);

const xhr = new XMLHttpRequest();
xhr.open('GET', `${ServerLocation}/playlists`);
xhr.addEventListener('load', () => {
  store.dispatch({
    type: 'GET_XHR_PLAYLISTS',
    serverPlaylists: JSON.parse(xhr.responseText)
  });
});
xhr.send();

export default store;
