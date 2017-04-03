/**
 * Created by NEXUS on 28/03/2017.
 */
export default function Player(props) {
 return (
   <div className="footer">
     <img src="${ props.track.artwork.url }" className="thumbnail"/>
     <h1 className="footer-title">song name</h1>
     <audio controls className="player">
       <source src="${ props.track.uri }/stream?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z" type="audio/ogg"/>
     </audio>
   </div>
 );
}
