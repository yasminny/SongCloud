import { createStore, combineReducers } from 'redux';

import playlists from './reducers/playlists';
import currentTrack from './reducers/current-track';

// const initalState={
//   currentTrack: null
// };

const reducer = combineReducers({
  currentTrack,
  playlists
  });

const store = createStore(reducer);

export default store;
