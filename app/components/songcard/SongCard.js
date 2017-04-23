import './songcard.scss';
import React from 'react';
// import store from '../../store';
// import uuid from 'uuid';
import { connect } from 'react-redux';
import uuid from 'uuid';

class SongCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isHeartClicked: false
    };
    this.updateClickedHeart = this.updateClickedHeart.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.xhrCreatePlaylist = this.xhrCreatePlaylist.bind(this);
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
  xhrCreatePlaylist(newPlaylist) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/xhrCreatePlaylist');

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.addEventListener('load', () => {
    console.log('ok');
  });

  xhr.addEventListener('error', () => {
    alert('problem!');
  });

  xhr.send(JSON.stringify(newPlaylist));

  return false;
}

  msToTime() {
    const duration = this.props.duration;
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  addSongToPlaylist(song) {
    const id = uuid();
    const playlistSongs = song ? [song] : [];
const newPlaylist = {
      id,
      title: 'Untitled',
      isFocusMode: true,
      songs: playlistSongs
    };
    this.xhrCreatePlaylist(newPlaylist);
    this.props.createNewPlaylist(newPlaylist);
    this.props.history.push('/playlists');
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


  render(props) {
    let heartClassName = this.state.relatedPlaylists !== undefined ? "add-to-list fa fa-heart blue-heart" : "add-to-list fa fa-heart-o";
    let openHeartClassName = this.state.isHeartClicked ? "add-to-list fa fa-heart-o blue-heart" : heartClassName;
    let dropdownClassName = this.state.isHeartClicked ? 'checkbox' : 'checkbox hidden';

    return (
      <div className="songcard songcard-comp">
        <div className="song-img" style={{'backgroundImage': `url( ${this.props.artwork_url})`}}
             onClick={ () => this.props.setCurrentTrack(this.props.song)}/>
        <div className="details">
          <h1>{this.props.title}</h1>
          <h2><i className="fa fa-clock-o" aria-hidden="true"/> { this.msToTime()}</h2>
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


function mapDispatchToProps(dispatch) {
  return {
    setCurrentTrack(song){
      dispatch({
        type: 'UPDATE_CURRENT_TRACK',
        currentTrack: song
      });
    },
    createNewPlaylist(newPlaylist){
      dispatch({
        type: 'CREATE_NEW_PLAYLIST',
        newPlaylist
      });
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);
