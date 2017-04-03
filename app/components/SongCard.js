/**
 * Created by NEXUS on 29/03/2017.
 */
export default function SongCard(props) {

  function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60);
    let minutes = parseInt((duration/(1000*60))%60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  return (
    <div className="songcard">
      <div className="song-img" style={{'backgroundImage': `url( ${props.artwork_url})`}}> </div>
      <div className="details">
        <h1>{props.title}</h1>
        <h2><i className="fa fa-clock-o" aria-hidden="true"/>{msToTime(props.duration)}</h2>
      </div>

      <button type="button" className="add-to-list"><i className="fa fa-heart"/></button>
    </div>
  );
}
