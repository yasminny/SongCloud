import PlaylistSideBar from './PlaylistSideBar';
import Playlist from './Playlist';

import React from 'react';

export default class Playlists extends React.Component {
  constructor(props) {
    super();

    // this.state = {
    //   // countdownTillLoading: 5,
    //   // songs: [],
    //   // songsLoading: 'empty',
    // };
  }
  //
  // componentDidMount() {
  //   // this.loadSongs();
  // }

  // loadSongs() {
  //   // const genre = this.props.match.params.genre.toString();
  //
  //   this.setState({songsLoading: 'loading'});
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=15&offset=0&tags=house`);
  //   xhr.addEventListener('load', () => {
  //     this.setState({songs: JSON.parse(xhr.responseText), songsLoading: 'loaded'});
  //   });
  //   xhr.addEventListener('error', () => {
  //     this.waitForLoading();
  //     this.setState({songsLoading: 'error'});
  //   });
  //   xhr.send();
  // }
  //
  // waitForLoading() {
  //   setTimeout(() => {
  //     this.setState({countdownTillLoading: this.state.countdownTillLoading - 1});
  //     if (this.state.countdownTillLoading === 0) {
  //       this.setState({countdownTillLoading: 5});
  //       this.loadSongs();
  //     }
  //     else {
  //       this.waitForLoading();
  //     }
  //   }, 1000);
  // }
  createPlaylist() {
    console.log('playlists',this.props.playlists.length);

    if (this.props.playlists.length > 0) {
      console.log('playlist');
      return <ul>
        {
          this.props.playlists.map((playlist, i)=>{

            return <Playlist
              playlist={ playlist }
              updateCurrentTrack={ this.props.updateCurrentTrack }
              // updateSelectedSong={ this.props.updateSelectedSong }
              // updateClickedBtn={ this.props.updateClickedBtn }
              // songs={ playlist.songs }
            />
          })
        }
      </ul>
    }
    else {
      return <h1>Why don't you create some nice playlist?</h1>
    }
  }

  render() {
    // switch (this.state.songsLoading) {
    // case 'loading':
    //   return <div className="loading"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"> </i></div>;
    // case 'error':
    //   return <div>Error! please
    //     <button type="button" onClick={ () => this.waitForLoading() }>try again</button>
    //     , or wait {this.state.countdownTillLoading} seconds</div>;
    // case 'loaded':
    return (
      <div className="playlists-comp-main">
        <PlaylistSideBar/>
        <div className="right-playlists">
          { this.createPlaylist() }
        </div>
      </div>
    );
    // case 'empty':
    //   return (
    //     <div className="playlists-comp">
    //       <PlaylistSideBar/>
    //       <h1>Why don't you create some nice playlist?</h1>
    //     </div>
    //   );
  }
}
