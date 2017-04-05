import Explore from './Explore';
import Playlists from './Playlists';
import Topbar from './Topbar';
import Player from './Player';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import React from 'react';

export default class Root extends React.Component {
  constructor() {
    super();

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this);
    // this.updateSelectedSong = this.updateSelectedSong.bind(this);
    // this.updateClickedBtn = this.updateClickedBtn.bind(this);

    this.state = {
      currentTrack: {},
      // selectedSong: {},
      // clickedBtn: {},
      playlists: [{
        id: 1,
        title: 'test',
        songs: []
      }]
    }
  }

  updateCurrentTrack(newSong) {
    this.setState({
      currentTrack: Object.assign({}, newSong)
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

  render() {
    return (
      <div className="main-root">
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
                              // updateSelectedSong={ this.updateSelectedSong }
                              // updateClickedBtn={ this.updateClickedBtn }
                              // selectedSong={ this.state.selectedSong }
                              // clickedBtn={ this.state.clickedBtn }
                              {...props}
                              playlists={ this.state.playlists }/>
            }}/>
            <Route exact path="/playlists" render={ () => {
              return <Playlists playlists={ this.state.playlists }
                                updateCurrentTrack={ this.updateCurrentTrack }
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
  };

}
