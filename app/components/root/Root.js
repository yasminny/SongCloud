import Explore from '../explore/Explore';
import Playlists from '../playlists/Playlists';
import Topbar from '../topbar/Topbar';
import Player from '../player/Player';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import uuid from 'uuid';
import React from 'react';

export default class Root extends React.Component {
  constructor() {
    super();

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.updateEditModePlaylist = this.updateEditModePlaylist.bind(this);
    this.changeListTitle = this.changeListTitle.bind(this);
    // this.updateSelectedSong = this.updateSelectedSong.bind(this);
    // this.updateClickedBtn = this.updateClickedBtn.bind(this);

    this.state = {
      currentTrack: {},
      // selectedSong: {},
      // clickedBtn: {},
      playlists: [{
        id: 1,
        title: 'test',
        isFocusMode: false,
        songs: []
      }]
    }
  }

  updateCurrentTrack(newSong) {
    this.setState({
      currentTrack: Object.assign({}, newSong)
    })
  }

  createNewPlaylist(newSong, redirectTo) {
    const newPlaylists = [...this.state.playlists];
    const playlistSongs = newSong ? [newSong] : [];
    newPlaylists.push({
      id: uuid(),
      title: 'untitled',
      isFocusMode: true,
      songs: playlistSongs
    });
    if (!redirectTo) {
      this.setState({
        playlists: newPlaylists
      })
    }
    if (redirectTo) {
      this.setState({
        playlists: newPlaylists
      }, () => {
        this.props.history.push(redirectTo);
      })
    }
  }

  updateEditModePlaylist(index){
    let oldPlaylist = this.state.playlists;
    oldPlaylist[index].isFocusMode = !oldPlaylist[index].isFocusMode;
    this.setState({
      playlists: oldPlaylist
    })
  }

  deletePlaylist(index){
    let oldPlaylist = this.state.playlists;
    oldPlaylist.splice(index, 1);
    this.setState({
      playlists: oldPlaylist
    })
  }

  changeListTitle(value, index){
    let oldPlaylist = this.state.playlists;
    oldPlaylist[index].title = value;
    this.setState({
      playlists: oldPlaylist
    })
  }


// updateSelectedSong(newSong) {
//   this.setState({
//     selectedSong: Object.assign({}, newSong)
//   })
// }
//
// updateClickedBtn(btn) {
//   this.setState({
//     clickedBtn: Object.assign({}, btn)
//   })
// }

render()
{
  return (
    <div className="main-root root-comp">
      <main>
        <Topbar/>
        <Switch>
          <Route exact path="/" component={() => {
            return <Redirect to="/explore"/>
          }}/>
          <Route exact path="/explore" component={ () => {
            return <Redirect to="/explore/house"/>
          }}/>
          {/*not a comp as I cant pass props without a function like the update function or the match object*/}
          <Route path="/explore/:genre" render={(props) => {
            return <Explore updateCurrentTrack={ this.updateCurrentTrack }
                            createNewPlaylist={ this.createNewPlaylist }
              // updateSelectedSong={ this.updateSelectedSong }
              // updateClickedBtn={ this.updateClickedBtn }
              // selectedSong={ this.state.selectedSong }
              // clickedBtn={ this.state.clickedBtn }
                            {...props}
                            playlists={ this.state.playlists }/>
          }}/>
          <Route exact path="/playlists" render={ () => {
            return <Playlists playlists={ this.state.playlists }
                              deletePlaylist={ this.deletePlaylist }
                              updateCurrentTrack={ this.updateCurrentTrack }
                              createNewPlaylist={ this.createNewPlaylist }
                              updateEditModePlaylist={ this.updateEditModePlaylist }
                              changeListTitle={ this.changeListTitle }
              // updateSelectedSong={ this.updateSelectedSong }
              // updateClickedBtn={ this.updateClickedBtn }
              // selectedSong={ this.state.selectedSong }
              // clickedBtn={ this.state.clickedBtn }
              // data={ this.state.playlists }
            />
          } }/>
        </Switch>
        <Player track={ this.state.currentTrack }/>
      </main>
    </div>);
}
;

}
