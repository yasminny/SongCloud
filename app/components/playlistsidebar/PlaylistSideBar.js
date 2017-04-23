import './playlistsidebar.scss';
import React from 'react';
import { connect } from 'react-redux';

class PlaylistSideBar extends React.Component{

  createPlayListsTitle(){
    if (this.props.playlists.length > 0) {
      return this.props.playlists.map((playlist)=> {
        return <li key={ playlist.id }>
          { playlist.title }
        </li>
        }

      )
    }
  }


  render(){
        return(
      <div className="sidebar playlists-sidebar-comp">
        <aside >
          <div className="playlist-btn-section">
            <button type="button" className="add-playlist-btn" onClick={()=> this.props.createNewPlaylist() }>Add new playlist</button>
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
    // setCurrentTrack(song){
    //   dispatch({
    //     type: 'UPDATE_CURRENT_TRACK',
    //     currentTrack: song
    //   });
    // },

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSideBar);
