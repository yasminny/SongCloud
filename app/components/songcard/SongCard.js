import './songcard.scss';
import React from 'react';
// import store from '../../store';
import {connect} from 'react-redux';
import uuid from 'uuid';

class SongCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isHeartClicked: false,
      relatedPlaylists: []
    };
    this.updateClickedHeart = this.updateClickedHeart.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.xhrCreatePlaylist = this.xhrCreatePlaylist.bind(this);
    this.handelPlaySong = this.handelPlaySong.bind(this);
    this.updateRelatedPlaylists = this.updateRelatedPlaylists.bind(this);
    this.isSongInPlaylist = this.isSongInPlaylist.bind(this);
    this.addOrRemoveSongToExistingPlaylist = this.addOrRemoveSongToExistingPlaylist.bind(this);
    this.xhrUpdateSongInPlaylist = this.xhrUpdateSongInPlaylist.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.updateRelatedPlaylists();
  }

  updateRelatedPlaylists() {
    let array = [];
    this.props.playlists.forEach((playlist, index) => playlist.songs.find((song) => {
      if (song.id === this.props.song.id) {
        return array.push(playlist.id);
      }
    }));
    console.log(array, 'setting the related playlists array');
    return this.setState({
      relatedPlaylists: array
    })
  }

  updateClickedHeart() {
    this.setState({
      isHeartClicked: !this.state.isHeartClicked
    })
  }

//create new playlist -----------------------------
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


//add song to a playlist -------------------------------------
  handleInputChange(event) {
    const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const playlistId = target.name;
    console.log(playlistId, 'target name should be id of new playlist');
    let newList = [];
    console.log(this.state.relatedPlaylists);
    if (this.state.relatedPlaylists.length > 0) {
      newList = [...this.state.relatedPlaylists];
      if(newList.find((id)=> id === playlistId)){
        const index = newList.findIndex((id)=> id === playlistId);
        newList.splice(index, 1);
      }
      else {
        newList.push(playlistId);
      }

    }
    else {
      newList = [playlistId];
    }
    this.addOrRemoveSongToExistingPlaylist(playlistId);
    this.setState({
      relatedPlaylists: newList
    });
  }

  addOrRemoveSongToExistingPlaylist(id) {
    const currentPlaylists = [...this.props.playlists];
    let index = currentPlaylists.map((playlist, index) =>{
      console.log(playlist.id, id, index);
      if(playlist.id = id){
        return index
      }
    } );
    console.log(index, 'if playlist id is the same');
    if (currentPlaylists[index].songs.find((song) => song.id === this.props.song.id)) {
      currentPlaylists[index].songs.push(this.props.song);
    }
    else {
      const songIndex = currentPlaylists[index].songs.findIndex((song) => song.id === this.props.song.id);
      currentPlaylists[index].songs.splice(songIndex, 1);
    }
    console.log(currentPlaylists);
    this.props.addOrRemoveSongFromPlaylist(currentPlaylists);
    this.xhrUpdateSongInPlaylist(currentPlaylists);
  }

//player related function-------------------------------------
  handelPlaySong(song) {
    this.props.setCurrentTrack(song);
    if (this.props.currentTrack !== this.props.song && this.props.isPlaying) {
      this.props.changePlayingMode();
    }
  }

  //functions for server updates(ajax)----------------------------------
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

  xhrUpdateSongInPlaylist(newPlaylists) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/xhrUpdateSongInPlaylist');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.log('ok');
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(newPlaylists));

    return false;
  }

// functions for rendering correct elements------------------------
  isSongInPlaylist(id) {
    if (this.state.relatedPlaylists.find((playlist) => playlist === id)) {
      return true;
    }
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
    return <ul>
      {this.props.playlists.map((playlist) => {
        return <li key={ playlist.id }>
          {/*// onClick={() => this.addOrRemoveSongToExistingPlaylist(playlist.id)}*/}

          <label className="checkbox">
            { playlist.title }
            <input type="checkbox"
                   name={playlist.id}
                   checked={ this.isSongInPlaylist(playlist.id)}
                   onChange={this.handleInputChange}/>
            <span className="indicator"/>
          </label>
        </li>
      })}
    </ul>
  }
//----------------------------------------------------------------------------
  render(props) {
    function trackTitleSlicer(title) {
      if (title.length > 25) {
        title = title.slice(0, 25) + '...';
      }
      return title;
    }

    const title = trackTitleSlicer(this.props.title);
    let heartClassName = this.state.relatedPlaylists.length > 0 ? "add-to-list fa fa-heart blue-heart" : "add-to-list fa fa-heart-o";
    let openHeartClassName = this.state.isHeartClicked ? "add-to-list fa fa-heart-o blue-heart" : heartClassName;
    let dropdownClassName = this.state.isHeartClicked ? 'checkbox-box' : 'checkbox-box hidden';
    let imageView = this.props.isPlaying && this.props.currentTrack === this.props.song ? "song-image playing fa fa-pause-circle-o" : "song-image paused fa fa-play-circle-o";

    return (
      <div className="songcard songcard-comp">
        <div className="song-img" style={{'backgroundImage': `url( ${this.props.artwork_url})`}}
             onClick={ () => this.handelPlaySong(this.props.song)}>
          <div className={ imageView }/>
        </div>
        <div className="details">
          <h1>{title}</h1>
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
      }, {
        type: 'CHANGE_IS_PLAYING'
      });
    },
    changePlayingMode(){
      dispatch({
        type: 'CHANGE_IS_PLAYING'
      });
    },
    createNewPlaylist(newPlaylist){
      dispatch({
        type: 'CREATE_NEW_PLAYLIST',
        newPlaylist
      });
    },
    addOrRemoveSongFromPlaylist(currentPlaylists){
      dispatch({
        type: 'UPDATE_SONG_IN_PLAYLIST',
        currentPlaylists
      });
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists,
    isPlaying: stateData.isPlaying,
    currentTrack: stateData.currentTrack
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);
