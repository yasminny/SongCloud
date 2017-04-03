import Signup from './Signup';
import Signin from './Signin';
import Explore from './Explore';
import Playlists from './Playlists';
import Topbar from './Topbar';
import Player from './Player';
import {
  BrowserRouter, Redirect,
  Route,
  Switch
} from 'react-router-dom';

import React from 'react';

export default class Root extends React.Component {
  constructor(){
    super();
    this.state= {
      currentTrack: null
    }
  }

render(){
  return (
    <BrowserRouter>
      <div className="main-root">
        <main>
          <Switch>
            <Route path="/signin" component={ Signin }/>
            <Route path="/signup" component={ Signup }/>
            <Route path="/" component={()=> {
              return <div>
                  <Topbar/>
                  <Route exact path="/" component={ ()=>(
                    <Redirect to="/explore/house"/>
                  ) }/>

                  <Route path="/explore/:genre" component={ Explore }/>
                  <Route exact path="/explore" component={ ()=>(
                    <Redirect to="/explore/house"/>
                  ) }/>
                  <Route path="/playlists" component={ Playlists }/>
                  <Player track={ this.state.currentTrack }/>
                </div>
            }}/>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

}
