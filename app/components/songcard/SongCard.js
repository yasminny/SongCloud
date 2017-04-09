import './songcard.scss';
import React from 'react';

export default class SongCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isHeartClicked: false,
      relatedPlaylists: []
      // isInPlaylist: false
    };

    this.updateClickedHeart = this.updateClickedHeart.bind(this);
    // this.updateRelatedPlaylists = this.updateRelatedPlaylists.bind(this);

  }


  updateClickedHeart() {
    this.setState({
      isHeartClicked: !this.state.isHeartClicked
    })
  }

  // updateRelatedPlaylists(event){
  // let newplaylists= [...this.state.relatedPlaylists];
  // newplaylists.push(event.target.value);
  //   this.setState({
  //     relatedPlaylists: newplaylists
  //   })
  // }

  msToTime() {
    const duration = this.props.duration;
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  addSongToPlaylist(song) {
    this.props.createNewPlaylist(song, '/playlists');
    }

  checkboxHeader() {
    if (this.props.mode === 'explore') {
      return <header className="checkbox-header">
        <p>Add to play list</p>
        <button type='button' className="create-playlist-btn" onClick={ () => this.addSongToPlaylist(this.props.song) }>
          Create playlist +
        </button>
      </header>
    }
    else {
      return <header className="checkbox-header">
        <p>Edit Playlist</p>
      </header>
    }
  }

  createPlaylist() {
    return this.props.playlists.map((playlist) => {
      return <div key={ playlist.id }>
        <input type="checkbox" value={playlist.id}/>
        <p>{ playlist.title }</p>
      </div>
    })
  }


  render() {
    let heartClassName = this.state.relatedPlaylists.length > 0 ? "add-to-list fa fa-heart blue-heart" : "add-to-list fa fa-heart-o";
    let openHeartClassName = this.state.isHeartClicked ? "add-to-list fa fa-heart-o blue-heart" : heartClassName;
    let dropdownClassName = this.state.isHeartClicked ? 'checkbox' : 'checkbox hidden';

    return (
      <div className="songcard songcard-comp">
        <div className="song-img" style={{'backgroundImage': `url( ${this.props.artwork_url})`}}
             onClick={ () => this.props.updateCurrentTrack(this.props.song)}/>
        <div className="details">
          <h1>{this.props.title}</h1>
          <h2><i className="fa fa-clock-o" aria-hidden="true"/> {() => this.msToTime()}</h2>
        </div>

        <button type="button" className={ openHeartClassName } onClick={ this.updateClickedHeart }/>
        <div className={ dropdownClassName }>
          { this.checkboxHeader() }
          <form>
            { this.createPlaylist() }
          </form>
        </div>
      </div>
    );
  }
}
