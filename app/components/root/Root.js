import Explore from '../explore/Explore';
import Playlists from '../playlists/Playlists';
import Topbar from '../topbar/Topbar';
import Player from '../player/Player';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import React from 'react';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className="main-root root-comp">
        <main>
          <Topbar
            {...this.props}/>
          <Switch>
            <Route exact path="/" component={() => {
              return <Redirect to="/explore"/>
            }}/>
            <Route exact path="/explore" component={ () => {
              return <Redirect to="/explore/house"/>
            }}/>
            <Route path="/explore/:genre" component={ Explore }/>
            <Route exact path="/playlists" component={ Playlists }/>
          </Switch>
          <Player/>
        </main>
      </div>
    );
  }
}
