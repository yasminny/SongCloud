import React from 'react';
import SongsComp from '../songs/SongsComp';
import './playlist.scss';
import {connect} from 'react-redux';
import {serverLocation} from '../../serverLocation';

class Playlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createSongs = this.createSongs.bind(this);
    this.xhrDeletePlaylist = this.xhrDeletePlaylist.bind(this);
    this.xhrUpdateEditModePlaylist = this.xhrUpdateEditModePlaylist.bind(this);
    this.handelBlurAndEnter = this.handelBlurAndEnter.bind(this);
    this.handelDeleteList = this.handelDeleteList.bind(this);
    this.focusOnThisPlaylist = this.focusOnThisPlaylist.bind(this);
    this.xhrUpdatePlaylistTitle = this.xhrUpdatePlaylistTitle.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: this.props.playlist.title
    })
  }

  componentDidUpdate() {
    if (this.props.playlist.isFocusMode || this.props.playlist.id === this.props.focusedPlaylist) {
      this.playlistElm.scrollIntoView({behavior: 'smooth'});
    }
    else {
      this.inputElm.blur();
    }
  }

  xhrDeletePlaylist(index) {
    const currentPlaylists = [...this.props.playlists];
    currentPlaylists.splice(index, 1);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/xhrChangesToPlaylist`);

    xhr.setRequestHeader('Content-Type', 'application/json');

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
    xhr.open('POST', `${serverLocation}/xhrChangesToPlaylist`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(newPlaylists));

    return false;
  }

  xhrUpdatePlaylistTitle(value, index) {
    const currentPlaylists = [...this.props.playlists];
    currentPlaylists[index].title = value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/xhrChangesToPlaylist`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(currentPlaylists));

    return false;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.changeListTitle(event.target.value, this.props.index)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.xhrUpdatePlaylistTitle(this.state.value, this.props.index);
  }

  handelBlurAndEnter() {
    const newMode = !this.props.playlist.isFocusMode;
    this.props.updateEditModePlaylist(this.props.index);
    this.xhrUpdateEditModePlaylist(this.props.index, newMode);
  }

  handelDeleteList(index) {
    let answer = confirm(`Deleting "${this.props.playlist.title}" playlist. Are you sure?`);
    if (answer) {
      this.xhrDeletePlaylist(index);
      this.props.deletePlaylist(index);
    }
  }

  toggleListTitleView() {
    if (this.props.playlist.isFocusMode) {
      return <form onSubmit={ this.handleSubmit}>
        <input type="text"
               className="playlist-title-input"
               autoFocus={ this.focusOnThisPlaylist() }
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
      return <h2 ref={(value) => this.inputElm = value }
                 onClick={ () => this.handelBlurAndEnter(this.props.index) }>{this.props.playlist.title}<span
        className="num-songs-in-list">{ this.props.playlist.songs.length}</span></h2>
    }
  }

  focusOnThisPlaylist() {
    if (this.props.playlist.isFocusMode || this.props.playlist.id === this.props.focusedPlaylist) {
      return true;
    }
    return false;
  }

  createSongs() {
    if (this.props.playlist.songs[0] !== undefined) {
      return <SongsComp
        songs={ this.props.playlist.songs }
        createNewPlaylist={ this.props.createNewPlaylist }
        mode={ 'playlist'}
        playlistId={ this.props.playlist.id }
        playlists={ this.props.playlists }
      />
    }
    else {
      return <p className="empty-list">Add some songs to this playlist.</p>
    }
  }

  render() {
    return (
      <div className="playlist-comp" ref={(value) => this.playlistElm = value}>
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
    },
    updateFocusedPlaylist(newPlaylist){
      dispatch({
        type: 'UPDATE_CURRENT_PLAYLIST',
        newPlaylist
      });
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists,
    focusedPlaylist: stateData.focusedPlaylist
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

