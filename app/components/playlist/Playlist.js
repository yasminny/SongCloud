import React from 'react';
import SongsComp from '../songs/SongsComp';
import './playlist.scss';

export default class Playlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.playlist.title
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createSongs = this.createSongs.bind(this);
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


  toggleListTitleView() {
    if (this.props.playlist.isFocusMode) {
      return <form onSubmit={ this.handleSubmit}>
        <input type="text"
               autoFocus={ this.props.playlist.isFocusMode }
               ref={(value) => this.inputElm = value }
               onBlur={() => this.props.updateEditModePlaylist(this.props.index)}
               onKeyDown={(event) => {
                 if (event.key === 'Enter') {
                   return this.props.updateEditModePlaylist(this.props.index)
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

  deletePlaylist(index){
    store.dispatch({
      type: 'DELETE_PLATLIST',
      selectedPlaylistIndex: index
    });
  }

  render() {
    const length = this.props.playlist.songs.length;
    return (
      <div className="playlist-comp">
        <div className="playlist-title">
          { this.toggleListTitleView() }
          <button type="button" className="delete-list-btn"
                  onClick={ () => this.deletePlaylist(this.props.index) }>Delete
          </button>
        </div>
        <div className="list-songs">
          { this.createSongs() }
        </div>

      </div>
    );
  }
}

