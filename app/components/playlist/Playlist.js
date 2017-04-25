import React from 'react';
import SongsComp from '../songs/SongsComp';
import './playlist.scss';
import { connect } from 'react-redux';

class Playlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.playlist.title
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createSongs = this.createSongs.bind(this);
    this.xhrDeletePlaylist = this.xhrDeletePlaylist.bind(this);
    this.xhrUpdateEditModePlaylist = this.xhrUpdateEditModePlaylist.bind(this);
    this.handelBlurAndEnter = this.handelBlurAndEnter.bind(this);
    this.handelDeleteList = this.handelDeleteList.bind(this);
    this.xhrUpdatePlaylistTitle = this.xhrUpdatePlaylistTitle.bind(this);
  }

  xhrDeletePlaylist(index) {
    const currentPlaylists = [...this.props.playlists];
    currentPlaylists.splice(index, 1);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/xhrDeletePlaylist');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.log('ok');
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(currentPlaylists));

    return false;
  }

  xhrUpdateEditModePlaylist(index, newMode) {
    const newPlaylists = [...this.props.playlists];
      newPlaylists[index].isFocusMode = newMode;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/xhrUpdateEditModePlaylist');

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

  componentDidUpdate() {
    if (this.props.playlist.isFocusMode) {
      this.inputElm.focus();
    }
    else {
      this.inputElm.blur();
    }
  }


  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});

    this.props.changeListTitle(event.target.value, this.props.index)
  }

  xhrUpdatePlaylistTitle(value, index){
    const currentPlaylists = [...this.props.playlists];
    currentPlaylists[index].title = value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/xhrDeletePlaylist');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.log('ok');
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(currentPlaylists));

    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.changeListTitle(this.state.value, this.props.index);
    this.xhrUpdatePlaylistTitle(this.state.value, this.props.index);
  }

  handelBlurAndEnter(){
    const newMode = !this.props.playlist.isFocusMode;
    this.props.updateEditModePlaylist(this.props.index);
  this.xhrUpdateEditModePlaylist(this.props.index, newMode);
  }

  toggleListTitleView() {
    if (this.props.playlist.isFocusMode) {
      return <form onSubmit={ this.handleSubmit}>
        <input type="text"
               autoFocus={ this.props.playlist.isFocusMode }
               ref={(value) => this.inputElm = value }
               onBlur={() => this.handelBlurAndEnter(this.props.index)}
               onKeyDown={(event) => {
                 if (event.key === 'Enter') {
                   return this.handelBlurAndEnter(this.props.index);
                 }
               }}
               onChange={ this.handleChange }
               value={this.state.value}
        />
      </form>
    }
    else {
      return <h2 ref={(value) => this.inputElm = value } onClick={ () => this.handelBlurAndEnter(this.props.index) }>{this.props.playlist.title}<span
        className="num-songs-in-list">{ this.props.playlist.songs.length}</span></h2>
    }
  }

  handelDeleteList(index) {
    console.log('delete clicked');
     this.xhrDeletePlaylist(index);
    this.props.deletePlaylist(index)
  }

  createSongs() {
    if (this.props.playlist.songs[0] !== undefined) {
      return <SongsComp
        songs={ this.props.playlist.songs }
        // updateCurrentTrack={ this.props.updateCurrentTrack }
        createNewPlaylist={ this.props.createNewPlaylist }
        mode={ 'playlist'}
        playlist={ this.props.playlist }
        playlists={ this.props.playlists }
        // updateSelectedSong={ props.updateSelectedSong }
      />
    }
    else {
      return <p className="empty-list">Add some songs to this playlist.</p>
    }
  }



  render() {
    const length = this.props.playlist.songs.length;
    return (
      <div className="playlist-comp">
        <div className="playlist-title">
          { this.toggleListTitleView() }
          <button type="button" className="delete-list-btn"
                  onClick={ () => this.handelDeleteList(this.props.index) }>Delete
          </button>
        </div>
        <div className="list-songs">
          { this.createSongs() }
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeListTitle(value, index){
      dispatch({
        type: 'UPDATE_PLAYLIST_TITLE',
        newPlaylistTitle: value,
        selectedPlaylistIndex: index
      });
    },
    deletePlaylist(index){
      dispatch({
        type: 'DELETE_PLATLIST',
        selectedPlaylistIndex: index
      });
    },
    updateEditModePlaylist(index){
      dispatch({
        type: 'UPDATE_PLAYLIST_FOCUS_MODE',
        selectedPlaylistIndex: index
      });
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

