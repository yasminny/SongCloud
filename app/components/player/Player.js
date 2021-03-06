import './player.scss';
import React from 'react';
import {connect} from 'react-redux';

class Player extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.playOrPause = this.playOrPause.bind(this);
    this.isThereCurrentTrack = this.isThereCurrentTrack.bind(this);
  }

  playOrPause() {
    if (this.props.currentTrack !== null) {
      if (this.props.isPaused) {
        return this.audioElem.play();
      }
      if (!this.props.isPaused) {
        return this.audioElem.pause();
      }
    }
  }

  componentDidUpdate() {
    this.playOrPause();
  }

  isThereCurrentTrack() {
    if (this.props.currentTrack !== null) {
      let songUrl = `${this.props.currentTrack.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;

      return (
        <div>
          <div className="player-img" style={{'backgroundImage': `url( ${this.props.currentTrack.artwork_url})`}}/>
          <h1 className="footer-title">{this.props.currentTrack.title}</h1>
          <audio className="player" src={ songUrl } controls ref={(ref) => this.audioElem = ref}
                 onPlay={() => this.props.setPause(true)}
                 onPause={() => this.props.setPause(false)}/>
        </div>
      );
    }
  }

  render() {
    let compClassName = this.props.currentTrack !== null ? "footer player-comp back-to-view-anim" : 'footer player-comp';

    return <div className={ compClassName }>
      { this.isThereCurrentTrack() }
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPause(value){
      dispatch({
        type: 'CHANGE_IS_PLAYING_VIA_PLAYER',
        value
      });
    },
  }
}

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrack,
    isPaused: stateData.isPaused
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
