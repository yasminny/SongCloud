import { createStore, combineReducers } from 'redux';

import playlists from './reducers/playlists';
import currentTrack from './reducers/current-track';

const reducer = combineReducers({
  currentTrack,
  playlists
  });

const store = createStore(reducer);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:3000/playlists`);
  xhr.addEventListener('load', () => {
    store.dispatch({
      type: 'GET_XHR_PLAYLISTS',
      serverPlaylists: JSON.parse(xhr.responseText)
    });
  });
  xhr.send();

export default store;
