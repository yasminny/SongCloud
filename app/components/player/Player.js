import './player.scss';
import React from 'react';
import { connect } from 'react-redux';

function Player(props) {

    let compClassName = props.currentTrack !== null? "footer player-comp back-to-view-anim" : 'footer player-comp';

    function isThereData() {
      if (props.currentTrack !== null){
        let songUrl = `${props.currentTrack.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
        return (<div>
          <div className="player-img" style={{'backgroundImage': `url( ${props.currentTrack.artwork_url})`}}/>
        <h1 className="footer-title">{props.currentTrack.title}</h1>
        <audio className="player" src={ songUrl } controls autoPlay/>
          </div>
      );
      }
    }

  return <div className={ compClassName }>
        { isThereData() }
      </div>
}

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrack
  }
}

export default connect(mapStateToProps)(Player);
