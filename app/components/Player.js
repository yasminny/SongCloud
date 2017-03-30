/**
 * Created by NEXUS on 28/03/2017.
 */
export default function Player() {
 return (
   <div className="footer">
     <img src="" className="thumbnail"/>
     <h1 className="footer-title">song name</h1>
     <audio controls className="player">
       <source src="https://api.soundcloud.com/tracks/250711755/stream"/>
     </audio>
   </div>
 );
}
