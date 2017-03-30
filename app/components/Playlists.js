import SongCard from './SongCard';
import Topbar from './Topbar';
import Player from './Player';
export default function Playlists() {
 return (
   <div>
     <Topbar/>
     <h1>Playlists component</h1>
     <ul className="songs">
     <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
       <li><SongCard/></li>
     </ul>
     <Player/>
   </div>
 );
}
