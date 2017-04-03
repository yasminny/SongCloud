/**
 * Created by NEXUS on 03/04/2017.
 */
import SongCard from './SongCard';
import React from 'react';

export default function SongsComp(props){
  return <div className="songs">
      <ul>
        {
          props.songs.map((song, i) => <li  key={ song.id }>
              <SongCard
                title={ song.title.slice(0, 30) }
                duration={ song.duration }
                artwork_url={ song.artwork_url.replace('large', 't300x300') }
              />
            </li>
          )}
      </ul>
    </div>;

}


