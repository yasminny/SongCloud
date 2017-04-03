/**
 * Created by NEXUS on 03/04/2017.
 */
import SongsComp from './SongsComp';

export default function Playlist(props){
  return(
    <div>
      <h2>{props.listTitle}</h2>
      <SongsComp
        songs={ props.songs }/>
    </div>
  );
}
