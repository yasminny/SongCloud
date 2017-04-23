import './playlists.scss';
import PlaylistSideBar from '../playlistsidebar/PlaylistSideBar';
import Playlist from '../playlist/Playlist';
import React from 'react';
import { connect } from 'react-redux';

function Playlists (props){
    return (
      <div className="playlists-comp-main playlists-comp">
        <PlaylistSideBar createNewPlaylist={ props.createNewPlaylist }
        playlists={ props.playlists }/>
        <div className="right-playlists">
          { createPlaylist(props) }
        </div>
      </div>
    );
}

function createPlaylist(props){
  if (props.playlists !== undefined) {
    return <ul className="playlists-lists">
      {
        props.playlists.map((playlist, i) => {
          return <li key={ playlist.id }>
            <Playlist
              // deletePlaylist={ this.props.deletePlaylist }
              playlist={ playlist }
              // playlists={ this.props.playlists }
              // createNewPlaylist={ this.props.createNewPlaylist }
              // updateEditModePlaylist={ this.props.updateEditModePlaylist }
              index={ i }
              // changeListTitle={ this.props.changeListTitle}
              // updateSelectedSong={ this.props.updateSelectedSong }
              // updateClickedBtn={ this.props.updateClickedBtn }
              // songs={ playlist.songs }
            />
          </li>
        })
      }
    </ul>
  }
  else {
    return <h1 className="no-playlists">Why don't you create some nice playlist?</h1>
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}

export default connect(mapStateToProps)(Playlists);
