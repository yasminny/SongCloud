import './playlistsidebar.scss';
import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

class PlaylistSideBar extends React.Component{
  constructor(props) {
    super();
    this.state = {};

    this.handelCreateNewPlaylist = this.handelCreateNewPlaylist.bind(this);
    this.xhrCreatePlaylist = this.xhrCreatePlaylist.bind(this);
    this.scrollToAPlaylist = this.scrollToAPlaylist.bind(this);
  }

  scrollToAPlaylist(id){
    console.log(id);
    this.props.updateFocusedPlaylist(id);
  }

  createPlayListsTitle(){
    if (this.props.playlists.length > 0) {
      return this.props.playlists.map((playlist)=> {
        return <li key={ playlist.id }
        onClick={()=> this.scrollToAPlaylist(playlist.id)}>
          { playlist.title }
        </li>
        }

      )
    }
  }
handelCreateNewPlaylist(){
  const id = uuid();
  const newPlaylist = {
    id,
    title: 'Untitled',
    isFocusMode: true,
    songs: []
  };
  this.props.updateFocusedPlaylist(newPlaylist.id);
  this.xhrCreatePlaylist(newPlaylist);
  this.props.createNewPlaylist(newPlaylist);
}

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

  render(){
        return(
      <div className="sidebar playlists-sidebar-comp">
        <aside >
          <div className="playlist-btn-section">
            <button type="button" className="add-playlist-btn" onClick={()=> this.handelCreateNewPlaylist() }>Add new playlist</button>
          </div>
          <ul>
            { this.createPlayListsTitle() }
          </ul>
        </aside>
      </div>
    );
  }

}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createNewPlaylist(newPlaylist){
      dispatch({
        type: 'CREATE_NEW_PLAYLIST',
        newPlaylist
      });
    },
    updateFocusedPlaylist(newPlaylist){
      dispatch({
        type: 'UPDATE_CURRENT_PLAYLIST',
        newPlaylist
      });
    }

    // setCurrentTrack(song){
    //   dispatch({
    //     type: 'UPDATE_CURRENT_TRACK',
    //     currentTrack: song
    //   });
    // },

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSideBar);
