import './player.scss';
import React from 'react';

export default class Player extends React.Component {

  constructor() {
    super();
  }

  render(){
    let compClassName = this.props.track.stream_url? "footer player-comp back-to-view-anim" : 'footer player-comp';
  let songUrl = `${this.props.track.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  return (
    <div className={ compClassName }>
      <div className="player-img" style={{'backgroundImage': `url( ${this.props.track.artwork_url})`}}/>
      <h1 className="footer-title">{this.props.track.title}</h1>
      <audio className="player" src={ songUrl } controls autoPlay/>
    </div>
  );
}
}
