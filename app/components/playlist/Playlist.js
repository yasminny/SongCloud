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
    this.handelBlur = this.handelBlur.bind(this);
    this.handelEnter = this.handelEnter.bind(this);
    this.handelDeleteList = this.handelDeleteList.bind(this);
  }


  xhrDeletePlaylist(index) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/xhrDeletePlaylist');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.log('ok');
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(index));

    return false;
  }

  xhrUpdateEditModePlaylist(index) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/xhrUpdateEditModePlaylist');

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      console.log('ok');
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(index));

    return false;
  }

  componentDidUpdate() {
    if (this.props.playlist.isFocusMode) {
      this.inputElm.focus();
    }
  }


  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.changeListTitle(this.state.value, this.props.index)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.changeListTitle(this.state.value, this.props.index)
  }

  handelBlur(){
    this.props.updateEditModePlaylist(this.props.index);
  this.xhrUpdateEditModePlaylist(this.props.index);
  }

  handelEnter(){
    this.xhrUpdateEditModePlaylist(this.props.index);
    this.props.updateEditModePlaylist(this.props.index);
  }

  toggleListTitleView() {
    if (this.props.playlist.isFocusMode) {
      return <form onSubmit={ this.handleSubmit}>
        <input type="text"
               autoFocus={ this.props.playlist.isFocusMode }
               ref={(value) => this.inputElm = value }
               onBlur={() => this.handelBlur()}
               onKeyDown={(event) => {
                 if (event.key === 'Enter') {
                   return this.handelEnter();
                 }
               }}
               onChange={ this.handleChange }
               value={this.state.value}
        />
      </form>
    }
    else {
      return <h2 onClick={ () => this.props.updateEditModePlaylist(this.props.index) }>{this.props.playlist.title}<span
        className="num-songs-in-list">{ this.props.playlist.songs.length}</span></h2>
    }
  }

  handelDeleteList() {
     this.xhrDeletePlaylist(this.props.index);
    this.props.deletePlaylist(this.props.index)
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
                  onClick={ () => this.handelDeleteList }>Delete
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

