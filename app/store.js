import {createStore, combineReducers} from 'redux';
import heartWasClicked from './reducers/heart-was-clicked';
import playlists from './reducers/playlists';
import currentTrack from './reducers/current-track';
import isPaused from './reducers/is-paused';
import focusedPlaylist from './reducers/focused-playlist';

const reducer = combineReducers({
  heartWasClicked,
  currentTrack,
  playlists,
  isPaused,
  focusedPlaylist
});

const store = createStore(reducer);

const xhr = new XMLHttpRequest();
xhr.open('GET', `${location.origin}/playlists`);
xhr.addEventListener('load', () => {
  store.dispatch({
    type: 'GET_XHR_PLAYLISTS',
    serverPlaylists: JSON.parse(xhr.responseText)
  });
});
xhr.send();

export default store;
