/**
 * Created by NEXUS on 03/04/2017.
 */
import SongCard from './SongCard';
import React from 'react';

export default function SongsComp(props){
  return <div className="songs">
      <ul>
        {
          props.songs.map((song, i) => {
              const imgUrl = song.artwork_url? song.artwork_url.replace('large','t300x300'): song.artwork_url;
            return <li  key={ song.id }>
              <SongCard
                song={song}
                title={ song.title.slice(0, 25) }
                duration={ song.duration }
                artwork_url={ imgUrl }
                updateCurrentTrack={ props.updateCurrentTrack }
                // updateSelectedSong={ props.updateSelectedSong }
                // selectedSong={ props.selectedSong }
                mode={ props.mode }
                playlists={ props.playlists }
              />
            </li>
          }
          )}
      </ul>
    </div>;

}


