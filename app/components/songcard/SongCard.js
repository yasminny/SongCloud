import './songcard.scss';
import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

class SongCard extends React.Component {
  constructor() {
    super();
    this.state = {
      relatedPlaylists: []
    };

    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.xhrCreatePlaylist = this.xhrCreatePlaylist.bind(this);
    this.handelPlaySong = this.handelPlaySong.bind(this);
    this.updateRelatedPlaylists = this.updateRelatedPlaylists.bind(this);
    this.addOrRemoveSongToExistingPlaylist = this.addOrRemoveSongToExistingPlaylist.bind(this);
    this.xhrUpdateSongInPlaylist = this.xhrUpdateSongInPlaylist.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isSongInThisPlaylist = this.isSongInThisPlaylist.bind(this);
    this.checkForDropdown = this.checkForDropdown.bind(this);
  }

  componentDidMount() {
    this.updateRelatedPlaylists();
  }

  updateRelatedPlaylists() {
    const currentPlaylists = [...this.props.playlists];
    let array = [];
    currentPlaylists.forEach((playlist, index) => playlist.songs.find((song) => {
      if (song.id === this.props.song.id) {
        return array.push(playlist.id);
      }
    }));
    return this.setState({
      relatedPlaylists: array
    })
  }

  isSongInThisPlaylist(id){
    const currentPlaylist = this.props.playlists.find((playlist)=> playlist.id === id);
    if (currentPlaylist.songs.length > 0){
      const isSongThere = currentPlaylist.songs.find((song)=> song.id === this.props.song.id);
      if(isSongThere){
        return true;
      }
    }
    else{
           return false;
    }
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
    const playlistId = target.name;
    this.addOrRemoveSongToExistingPlaylist(playlistId);
  }

  addOrRemoveSongToExistingPlaylist(id) {
    const currentPlaylists = [...this.props.playlists];
    const index = currentPlaylists.findIndex((playlist)=> playlist.id === id);
    if(this.isSongInThisPlaylist(id)){
      const songIndex = currentPlaylists[index].songs.findIndex((song) => song.id === this.props.song.id);
      currentPlaylists[index].songs.splice(songIndex, 1);
    }
    else{
      currentPlaylists[index].songs.push(this.props.song);
    }
    if(this.props.mode === 'explore'){
      this.props.addOrRemoveSongFromPlaylist(currentPlaylists, 0);
    }
    else{
      this.props.addOrRemoveSongFromPlaylist(currentPlaylists, id);
    }
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

  checkForDropdown(){
  let playlistId = this.props.playlistId;

  const theRightSong = this.props.heartWasClicked.songId === this.props.song.id;

  const theRightPlaylist = this.props.heartWasClicked.playlistId !== 0 && this.props.heartWasClicked.playlistId === playlistId;

  if (this.props.heartWasClicked.playlistId === 0 && theRightSong || theRightPlaylist && theRightSong){
    return true;
  }
  else{
    return false;
  }
}


  createPlaylist() {
    return <ul>
      {this.props.playlists.map((playlist) => {
        return <li key={ playlist.id }>
          <label className="checkbox">
            { playlist.title }
            <input type="checkbox"
                   name={playlist.id}
                   checked={ this.isSongInThisPlaylist(playlist.id)}
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

    const thisIsTheOnlyOpenedCheckbox = this.checkForDropdown();

    let playlistId = this.props.playlistId;
    const title = trackTitleSlicer(this.props.title);

    let heartBlue = this.state.relatedPlaylists.length > 0 ? "add-to-list fa fa-heart blue-heart" : "add-to-list fa fa-heart-o";

    let heartClicked = this.props.heartWasClicked.songId === this.props.song.id && this.props.heartWasClicked.playlistId === this.props.playlistId? "add-to-list fa fa-heart-o blue-heart" : heartBlue;

    let dropdownClassName = thisIsTheOnlyOpenedCheckbox? 'checkbox-box' : 'checkbox-box hidden';

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
        <button type="button" className={ heartClicked } onClick={ ()=>  this.props.thisHeartWasClicked(this.props.song.id, playlistId, this.props.heartWasClicked.songId, this.props.heartWasClicked.playlistId) }/>
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
    addOrRemoveSongFromPlaylist(currentPlaylists, playlistId){
      dispatch({
        type: 'UPDATE_SONG_IN_PLAYLIST',
        currentPlaylists
      });
      dispatch({
        type: 'A_HEART_WAS_CLICKED',
        playlistId
      });
    },
    thisHeartWasClicked(songId, playlistId, oldSongId, oldPlaylistId){
      if (oldSongId === songId && oldPlaylistId === playlistId){
        dispatch({
          type: 'A_HEART_WAS_CLICKED',
          songId: 0,
          playlistId: 0
        });
      }
      else {
        dispatch({
          type: 'A_HEART_WAS_CLICKED',
          songId,
          playlistId
        });
      }
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists,
    isPlaying: stateData.isPlaying,
    currentTrack: stateData.currentTrack,
    heartWasClicked: stateData.heartWasClicked
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);
