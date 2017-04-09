import './player.scss';

export default function Player(props) {
  const songUrl = `${props.track.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  return (
   <div className="footer player-comp">
     <div className="player-img" style={{'backgroundImage': `url( ${props.track.artwork_url})`}}/>
     <h1 className="footer-title">{props.track.title}</h1>
     <audio  className="player"  src={ songUrl } controls autoPlay/>
   </div>
 );
}
