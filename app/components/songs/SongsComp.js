import './songs.scss';
import SongCard from '../songcard/SongCard';
import React from 'react';

export default function SongsComp(props) {
  return <div className="songs songs-comp">
    <ul>
      {
        props.songs.map((song, i) => {
            const imgUrl = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : song.artwork_url;
            return <li key={ song.id }>
              <SongCard
                song={song}
                title={ song.title }
                duration={ song.duration }
                artwork_url={ imgUrl }
                // updateCurrentTrack={ props.updateCurrentTrack }
                createNewPlaylist={ props.createNewPlaylist }
                // updateSelectedSong={ props.updateSelectedSong }
                // selectedSong={ props.selectedSong }
                mode={ props.mode }
                // playlists={ props.playlists }
                playlistId={ props.playlistId}
                history={props.history}
              />
            </li>
          }
        )}
      <li className="empty"/>
      <li className="empty"/>
      <li className="empty"/>
    </ul>
  </div>;
}


